import checkAuthorization from "@/lib/checkAuthorization";
import { Roles, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Data } from "./route";
import { authOptions } from "../auth/[...nextauth]/route";

export async function DELETE(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = await getServerSession(req, res, authOptions);

    if (!checkAuthorization(session, [Roles.ADMIN, Roles.SUPERADMIN, Roles.PUBLISHER])) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { articleId } = req.body;
    if (!articleId) {
        return res.status(400).json({ message: "Article ID is required" });
    }
    const prisma = new PrismaClient();
    prisma.article
        .delete({
            where: {
                id: articleId,
                author: session.user.id,
            },
        })
        .then(() => {
            return res.status(200).json({ message: "Article deleted" });
        })
        .catch(() => {
            return res.status(404).json({ message: "Article not found" });
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}
