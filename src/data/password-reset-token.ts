import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

/**
 * Get password reset token by token
 * @param token - string
 * @returns passwordResetToken - object
 */

export async function getPasswordResetTokenByToken(token: string) {
  try {
    const passwordResetToken = db.passwordResetToken.findUnique({
      where: {
        token,
      },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
}

/**
 * Get password reset token by email
 * @param email 
 * @returns passwordResetToken - object
 */
export async function getPasswordResetTokenByEmail(email: string) {
  try {
    const passwordResetToken = db.passwordResetToken.findFirst({
      where: {
        email,
      },
    });
    return passwordResetToken;
  } catch (error) {
    return null;
  }
}


/**
 *  Create password reset token
 * @param email 
 * @returns passwordResetToken - object
 */
export async function createPasswordResetToken(email: string) {
    const token = uuidv4();
    const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 15);

    const existingToken = await getPasswordResetTokenByEmail(email);
    if (existingToken) {
        await db.passwordResetToken.delete({
            where: {
                id: existingToken.id,
            },
        });
    }

    const passwordResetToken = db.passwordResetToken.create({
        data: {
            email,
            token,
            expiresAt,
        },
    });
    return passwordResetToken;
}
