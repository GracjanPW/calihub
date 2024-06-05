import NextAuth, { Awaitable, RequestInternal, User } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client"
import { signIn } from "next-auth/react";
import {Roles as PrismaRoles} from "@/../.prisma/client"



const prisma = new PrismaClient()

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || ""
    }),
    // ...add more providers here
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET || "",
  callbacks:{
    async signIn({ user }){
      if (user.role == PrismaRoles.BLOCKED) {
        return false
      }
      return true
      
    },
    async session({ session, user, token }) {

      session.user.role = user.role
      return session
    }
  }
}

export default NextAuth(authOptions)