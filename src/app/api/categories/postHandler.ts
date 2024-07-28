import { Roles, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Data } from ".";
import { authOptions } from "../auth/[...nextauth]";
import checkAuthorization from "@/lib/checkAuthorization";

/**
 * Handles the creation of a new category.
 *
 * @param req - The NextApiRequest object.
 * @param res - The NextApiResponse object.
 * @returns A Promise that resolves to the created category.
 */
export async function postHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const session = await getServerSession(req, res, authOptions);

 

  if (!checkAuthorization(session, [Roles.ADMIN, Roles.SUPERADMIN])) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const prisma = new PrismaClient();

  const existingCategory = await prisma.category.findFirst({
    where: {
      name: req.body.name,
    },
  });

  if (existingCategory) {
    return res.status(400).json({ message: "Category already exists" });
  }

  const newCategory = await prisma.category.create({
    data: {
      name: req.body.name,
    },
  });

  await prisma.$disconnect();

  return res.status(201).json(newCategory);
}
