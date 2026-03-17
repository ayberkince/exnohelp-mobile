import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const authOptions: NextAuthOptions = {
  // 1. Tell NextAuth we are using JSON Web Tokens (JWT) for sessions
  session: {
    strategy: "jwt",
  },
  
  // 2. Define how users can log in
  providers: [
    CredentialsProvider({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "maria@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Find the user in our newly seeded database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        // ⚠️ FOUNDER NOTE: For this immediate test, we are checking exact strings 
        // because we seeded "password123". In production, we will use bcrypt to compare hashes!
        if (user.password === credentials.password) {
          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role, // Pass the role (CLIENT, HELPER, ADMIN) to the session!
          };
        }

        return null;
      }
    })
  ],

  // 3. Attach the User's Role to their active session so we can build Role-Based Dashboards
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
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

  // 4. Send users here if they try to access a protected page
  pages: {
    signIn: '/auth/login',
  }
};