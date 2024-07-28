import { Roles, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Data } from ".";
import { authOptions } from "../auth/[...nextauth]";

/**
 * Handles the update operation for a category.
 *
 * @param req - The NextApiRequest object.
 * @param res - The NextApiResponse object.
 * @returns A Promise that resolves to the updated category.
 */
export async function updateHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const categoryId = req.body.categoryId;
  const newName = req.body.newName;

  const session = await getServerSession(req, res, authOptions);

  if (!session ||
    ![Roles.ADMIN, Roles.SUPERADMIN].includes(session.user.role)) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const prisma = new PrismaClient();

  const existingCategory = await prisma.category.findUnique({
    where: {
      id: categoryId,
    },
  });

  if (!existingCategory) {
    return res.status(404).json({ message: "Category not found" });
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: newName,
    },
  });

  await prisma.$disconnect();

  return res.status(200).json(updatedCategory);
}
