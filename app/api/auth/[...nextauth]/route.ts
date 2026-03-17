import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

// Safe Prisma instantiation for development
const prisma = new PrismaClient();

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || "super-secret-development-key",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login", // 👈 Points to our new custom login page
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password");
        }

        // 1. Find the user in YOUR REAL DATABASE (Using new schema)
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        // 2. If user doesn't exist or hasn't set a password yet
        if (!user || !user.password) {
          throw new Error("No user found with this email");
        }

        // 3. Check if password matches (Using exact match for our Seed Data)
        // ⚠️ In production, we will switch this back to bcrypt!
        const isPasswordCorrect = credentials.password === user.password;

        if (!isPasswordCorrect) {
          throw new Error("Invalid password");
        }

        // 4. Return the user (Using the new 'name' field)
        return {
          id: user.id,
          email: user.email,
          name: user.name, 
          role: user.role,
        };
      }
    })
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
      }
      // I kept your awesome trigger logic here!
      if (trigger === "update" && session?.role) {
        token.role = session.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
      }
      return session;
    }
  },
});

export { handler as GET, handler as POST };