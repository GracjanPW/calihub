import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { Data } from ".";

/**
 * Handles the retrieval of all categories.
 *
 * @param req - The NextApiRequest object.
 * @param res - The NextApiResponse object.
 * @returns A Promise that resolves to the categories.
 */
export async function getHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
  const prisma = new PrismaClient();

  const categories = await prisma.category.findMany();

  await prisma.$disconnect();

  return res.status(200).json({ categories });
}
