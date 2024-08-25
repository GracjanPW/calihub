import db from "@/lib/db";

/**
 * GetUserById
 *
 * @param id string
 * @returns object
 *
 */

export async function getUserById(id: string) {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    });
    return user;
  } catch {
    return null;
  }
}

/**
 * GetUserByEmail
 * @param email string
 * @returns object
 */
export async function getUserByEmail(email: string) {
  try {
    const user = await db.user.findFirst({
      where: {
        email,
      },
    });
    return user
  } catch {
    return null;
  }
}
