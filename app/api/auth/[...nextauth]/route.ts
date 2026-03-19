import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaClient } from "@prisma/client"
import { AuthOptions } from "next-auth"

import { prisma } from "@/lib/prisma";

// 🚨 We export this so we can use it in getServerSession(authOptions)
export const authOptions: AuthOptions = {
  secret: process.env.NEXTAUTH_SECRET ?? "dev-secret",
  session: {
    strategy: "jwt" as const,
  },
  pages: {
    signIn: "/auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password")
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        })

        if (!user || !user.password) {
          throw new Error("No user found with this email")
        }

        const isPasswordCorrect = credentials.password === user.password
        if (!isPasswordCorrect) throw new Error("Invalid password")

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isOnboarded: true
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      // Initial sign in
      if (user) {
        token.id = user.id;
        // @ts-ignore
        token.role = user.role;
        // @ts-ignore
        token.isOnboarded = user.isOnboarded;
      }

      // 🚨 Handle the 'update' trigger from the Onboarding Wizard
      if (trigger === "update" && session) {
        if (session.role) token.role = session.role;
        token.isOnboarded = true; // Once they update via wizard, they are onboarded
      }

      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        // @ts-ignore
        session.user.id = token.id;
        // @ts-ignore
        session.user.role = token.role;
        // @ts-ignore
        session.user.isOnboarded = token.isOnboarded;
      }
      return session;
    },
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }