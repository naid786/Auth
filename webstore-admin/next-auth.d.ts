import NextAuth, { type DefaultSession } from "next-auth"
import { JWT } from "next-auth/jwt";
import {UserRole} from "@prisma/client"

export type ExtendedUser = DefaultSession['user'] &{
    role: UserRole;
    isTwoFactorEnabled :boolean;
    isOAuth: boolean;
}
declare module "next-auth" {
    /**
     * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
     */
    interface Session {
        user: ExtendedUser;
    }
}

declare module "next-auth/jwt" {
    /** Returned by the `jwt` callback and `auth`, when using JWT sessions */
    interface JWT {
        /** OpenID ID Token */
        role?: UserRole;
    }
}