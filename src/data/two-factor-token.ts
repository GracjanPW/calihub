import db from "@/lib/db";
import crypto from "crypto";
/**
 * Get two factor token by email
 * @param email - string
 * @returns twoFactorToken - object
 */

export async function getTwoFactorTokenByEmail(email: string) {
  try {
    const twoFactorToken = db.twoFactorToken.findFirst({
      where: {
        email,
      },
    });

    return twoFactorToken;
  } catch (error) {
    return null;
  }
}

/**
 * Get two factor token by token
 * @param token - string
 * @returns twoFactorToken - object
 */
export async function getTwoFactorTokenByToken(token: string) {
  try {
    const twoFactorToken = db.twoFactorToken.findUnique({
      where: {
        token,
      },
    });

    return twoFactorToken;
  } catch (error) {
    return null;
  }
}

/**
 * Create two factor token
 * @param email - string
 * @returns twoFactorToken - object
 */
export async function createTwoFactorToken(email: string) {
    const token = crypto.randomInt(100_000, 1_000_000).toString();
    const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 5);

    const existingToken = await getTwoFactorTokenByEmail(email);
    if (existingToken) {
        await db.twoFactorToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }
    const twoFactorToken = db.twoFactorToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    });
    return twoFactorToken;
}

export async function getTwoFactorConfirmationByUserId(userId: string) {
  try {
    const twoFactorConfirmation = db.twoFactorConfirmation.findUnique({
      where: {
        userId,
      },
    });

    return twoFactorConfirmation;
  } catch (error) {
    return null;
  }
}
