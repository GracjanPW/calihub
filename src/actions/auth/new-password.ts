"use server";

import db from "@/lib/db";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { newPasswordSchema } from "@/schema/authSchema";
import { genSaltSync, hashSync } from "bcryptjs";
import { z } from "zod";

export default async function newPassword(values:z.infer<typeof newPasswordSchema>,token?: string | null) {
   if (!token) return { error: "Missing token" };
   const validationResult = newPasswordSchema.safeParse(values);
    if (!validationResult.success) return { error: "Invalid fields" };

    const {password} = validationResult.data;
    const existingToken = await getPasswordResetTokenByToken(token);
    if (!existingToken) return { error: "Invalid token!" };

    const expired = new Date(existingToken.expiresAt) < new Date();
    if (expired) return { error: "Token expired!" };

    const existingUser = await getUserByEmail(existingToken.email);
    if (!existingUser) return { error: "Email does not exist!" };

    const hashedPassword = hashSync(password, genSaltSync(10));
    await db.user.update({
        where: { id: existingUser.id },
        data: { password: hashedPassword},
    });

    await db.passwordResetToken.delete({ where: { id: existingToken.id } });

    return { success: "Password updated!" };
} 