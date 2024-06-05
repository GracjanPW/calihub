import NextAuth, { User } from "next-auth"
import type {Roles as PrismaRoles} from '../prisma/client'


declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface CustomUser extends User {
    role: PrismaRoles
  } 

  interface Session {
    user: CustomUser
  }
}