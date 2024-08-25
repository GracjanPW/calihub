
import db from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

/**
 * Get verification token by email
 * @param email - string
 * @returns verificationToken - object
 */
export async function getVerifcationTokenByEmail(email: string) {
  try {
    const verificationToken = db.verificationToken.findFirst({
      where: {
        email,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
}

/**
 * Get verification token by token
 * @param token - string
 * @returns verificationToken - object
 */
export async function getVerifcationTokenByToken(token: string) {
  try {
    const verificationToken = db.verificationToken.findUnique({
      where: {
        token,
      },
    });

    return verificationToken;
  } catch (error) {
    return null;
  }
}

export async function createVerificationToken(email: string) {
  const token = uuidv4();
  const expiresAt = new Date(new Date().getTime() + 1000 * 60 * 60);

  const existingToken = await getVerifcationTokenByEmail(email);
  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });
  }

  const verificationToken = db.verificationToken.create({
    data: {
      email,
      token,
      expiresAt,
    },
  });
  return verificationToken;
}
