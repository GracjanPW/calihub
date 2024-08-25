"use server";
import { signIn } from "@/auth/auth";
import {
  createTwoFactorToken,
  getTwoFactorConfirmationByUserId,
  getTwoFactorTokenByEmail,
} from "@/data/two-factor-token";
import { getUserByEmail } from "@/data/user";
import { createVerificationToken } from "@/data/verify-token";
import db from "@/lib/db";
import { sendTwoFactorToken, sendVerificationEmail } from "@/lib/email/emails";
import { DEFAULT_AUTH_REDIRECT } from "@/routes";
import { loginCredentialsSchema } from "@/schema/authSchema";
import { compareSync } from "bcryptjs";
import { AuthError } from "next-auth";
import { z } from "zod";

export default async function login(
  values: z.infer<typeof loginCredentialsSchema>
) {
  const validated = loginCredentialsSchema.safeParse(values);

  if (validated.error) {
    return { error: "Invalid fields" };
  }
  const { email, password, code } = values;
  const existingUser = await getUserByEmail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Invalid credentials" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await createVerificationToken(existingUser.email);
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Email not verified. Confirmation email sent!" };
  }

  if (existingUser.twoFactor && existingUser.email) {
    const validPassword = compareSync(password, existingUser.password);
    if (!validPassword) return { error: "Invalid credentials" };

    if (code) {
      const twoFactorToken = await getTwoFactorTokenByEmail(existingUser.email);
      if (!twoFactorToken) return { error: "Invalid code" };

      if (twoFactorToken.token !== code) return { error: "Invalid code" };

      const expired = new Date(twoFactorToken.expiresAt).getTime() < Date.now();
      if (expired) return { error: "Code expired" };

      await db.twoFactorToken.delete({
        where: {
          id: twoFactorToken.id,
        },
      });

      const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
        existingUser.id
      );
      if (twoFactorConfirmation) {
        await db.twoFactorConfirmation.delete({
          where: {
            id: twoFactorConfirmation.id,
          },
        });
      }
      await db.twoFactorConfirmation.create({
        data: {
          userId: existingUser.id,
        },
      });
    } else {
      const twoFactorToken = await createTwoFactorToken(existingUser.email);
      await sendTwoFactorToken(twoFactorToken.email, twoFactorToken.token);
      return { twoFactor: true, success: "2FA code sent to your email" };
    }
  }

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: DEFAULT_AUTH_REDIRECT,
    });
    return { success: "Logged in!" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials" };
        default:
          return { error: "Something went wrong" };
      }
    }
    throw error;
  }
}
