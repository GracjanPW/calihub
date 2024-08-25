import calculateTimeToRead from "@/lib/calculateTimeToRead";
import checkAuthorization from "@/lib/checkAuthorization";
import { Roles, PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { Data } from "./route";
import {auth} from "@/auth/auth"

export async function PUT(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = await auth();
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    if (!checkAuthorization(session, [Roles.ADMIN, Roles.OWNER, Roles.PUBLISHER])) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const {
        articleId, title, content, categoryId, draft,
    } = req.body;

    if (!articleId) {
        return res.status(400).json({ message: "Article ID is required" });
    }
    const prisma = new PrismaClient();
    const existingArticle = await prisma.article.findUnique({
        where: {
            id: articleId,
            userId: session.user.id,
        },
    });
    if (!existingArticle) {
        return res.status(404).json({ message: "Article does not exist or You're not the Author" });
    }
    if (title) {
        existingArticle.title = title;
    }
    if (content) {
        existingArticle.content = content;
        existingArticle.timeToRead = calculateTimeToRead(content);
    }
    if (categoryId) {
        existingArticle.categoryId = categoryId;
    }
    if (draft) {
        existingArticle.isPublished = !draft;
    }
    const updatedArticle = await prisma.article.update({
        where: {
            id: articleId,
        },
        data: existingArticle,
    });
    await prisma.$disconnect();
    return res.status(200).json(updatedArticle);



}
