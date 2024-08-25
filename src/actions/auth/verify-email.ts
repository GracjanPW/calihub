"use server";

import db from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerifcationTokenByToken } from "@/data/verify-token";

export default async function verifyEmail(token: string) {
        const existingToken = await getVerifcationTokenByToken(token);
        if (!existingToken) return { error: "Token does not exist!" };

        const expired = new Date(existingToken.expiresAt) < new Date();

        if (expired) return { error: "Token expired!" };

        const user = await getUserByEmail(existingToken.email);
        if (!user) return { error: "Email does not exist!" };

        await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date(),
                    email: existingToken.email
                 },
        });
        await db.verificationToken.delete({ where: { id: existingToken.id } });

    return { success: "Email verified" };
}