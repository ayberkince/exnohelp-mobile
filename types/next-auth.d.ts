import NextAuth, { DefaultSession } from "next-auth"
import { Role } from "@prisma/client"

declare module "next-auth" {
  interface User {
    id: string
    role?: Role | null
    isOnboarded: boolean
  }

  interface Session {
    user: {
      id: string
      role?: Role | null
      isOnboarded: boolean
    } & DefaultSession["user"]
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string
    role?: Role | null
    isOnboarded: boolean
  }
}