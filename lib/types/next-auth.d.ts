import { User } from "next-auth"
import {Role} from "@prisma/client"
import "next-auth/jwt"

type UserID = string
type AccessToken = string

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & {
        id: UserID
        role: Role
    },
    accessToken: AccessToken
  }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
    interface JWT {
      /** OpenID ID Token */
      id: UserID
      role: Role
      accessToken: AccessToken
    }
  }