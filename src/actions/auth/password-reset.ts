"use server"
import { createPasswordResetToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { emailResetPasswordSchema } from "@/schema/authSchema";
import { z } from "zod";
import { sendPasswordResetEmail } from "@/lib/email/emails";


export default async function sendPasswordReset(values: z.infer<typeof emailResetPasswordSchema>) {
    const validationResult = emailResetPasswordSchema.safeParse(values);
    if (!validationResult.success) return { error: "Invalid email" };
    
    const existingUser = await getUserByEmail(validationResult.data.email);
    if (!existingUser || !existingUser?.email) return { error: "Email does not exist" };

    const passwordResetToken = await createPasswordResetToken(existingUser.email);

    await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);

    return { success: "Email sent" };
}