import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { db } from "./lib/db"
import { getUserById } from "./data/user"
import { getTwoFactorConfirmationByUserId } from "@/data/two-factor-confirmation"
import { getAccoutnByUserId } from "./data/account"



export const { auth, handlers, signIn, signOut } = NextAuth({

    pages: {
        signIn: "/auth/login",
        error: "auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            })
        }
    },

    callbacks: {
        async signIn({ user, account }) {
            //Allow OAuth without email verification
            if (account?.provider !== "cretentials") return true;

            if(user.id){
                const existingUser = await getUserById(user.id);

                //prevent sign in without email verification
                if (!existingUser || !existingUser.emailVerified) return false;

                //TODO: Add 2FA check
                if (existingUser.isTwoFactorEnabled){
                    const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(existingUser.id)
                    
                    if (!twoFactorConfirmation) return false;

                    // Delte two factor confirmation for next sign in
                    await db.twoFactorConfirmation.delete({
                        where: {userId:twoFactorConfirmation.id}
                    })
                }
            }
            

            return true;
        },
        async session({ token, session }) {
            if (token.sub && session.user) {
                session.user.id = token.sub
            }
            if (token.role && session.user) {
                session.user.role = token.role;
            }
            if ( session.user) {
                session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
            }
            if (session.user) {
                session.user.name = token.name;
                session.user.email = token.email as string;
                session.user.isOAuth = token.isOAuth as boolean;
            }
            
            return session
        },

        async jwt({ token }) {
            if (!token.sub) return token

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            const existingAccount = await getAccoutnByUserId(existingUser.id);

            token.isOAuth = !!existingAccount;
            token.name = existingUser.name;
            token.email = existingUser.email;
            token.role = existingUser.role
            token.isTwoFactoEnabled = existingUser.isTwoFactorEnabled;
            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig
})