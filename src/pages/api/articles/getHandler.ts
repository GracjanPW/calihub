import checkAuthorization from "@/lib/checkAuthorization";
import { Roles, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Data } from ".";
import { authOptions } from "../auth/[...nextauth]";

export async function getHandler(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = await getServerSession(req, res, authOptions);

    if (!checkAuthorization(session, [Roles.ADMIN, Roles.SUPERADMIN, Roles.PUBLISHER])) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const prisma = new PrismaClient();
    const articles = await prisma.article.findMany({
        where: {
            author: session.user.id,
        },
        include: {
            category: true,
        },
    });
    await prisma.$disconnect();
    return res.status(200).json({ articles });
}
