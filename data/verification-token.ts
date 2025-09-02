import { db } from "@/lib/db";

export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verfcationToken = await db.verificationToken.findFirst({
            where: {
                email
            }
        });
        return verfcationToken

    }
    catch {
        return null
    }
}

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verfcationToken = await db.verificationToken.findUnique({
            where: {
                token
            }
        });
        return verfcationToken

    }
    catch {
        return null
    }
}