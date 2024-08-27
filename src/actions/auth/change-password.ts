"use server";
import { changePasswordSchema } from "@/schema/authSchema";
import { z } from "zod";
import getUser from "../getUser";
import { getUserByEmail, getUserById } from "@/data/user";
import { compareSync, genSaltSync, hashSync } from "bcryptjs";
import db from "@/lib/db";

async function changePassword(values: z.infer<typeof changePasswordSchema>) {
  const validated = await changePasswordSchema.safeParse(values);
  if (validated.error) return { error: "Invalid fields" };

  const user = await getUser();
  if (!user || !user.id) return { error: "Something went wrong" };
  const dbUser = await getUserById(user.id);
  // TODO handle if user has no password because using a provider

  if (!dbUser || !dbUser.password) return { error: "Something went wrong" };
  const { password, newPassword } = values;
  const passwordMatch = compareSync(password, dbUser.password);
  if (!passwordMatch) return { error: "Incorrect password" };
  const hashedPassword = hashSync(newPassword, genSaltSync(10));

  try {
    await db.user.update({
      where: {
        id: dbUser.id,
      },
      data: {
        password: hashedPassword,
      },
    });
  } catch {
    return { error: "Something went wrong" };
  }

  return { success: "Password reset" };
}

export default changePassword;
