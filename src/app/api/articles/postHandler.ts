import calculateTimeToRead from "@/lib/calculateTimeToRead";
import checkAuthorization from "@/lib/checkAuthorization";
import { Roles, PrismaClient, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import { Data } from "./route";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextApiRequest, res: NextApiResponse<Data>) {
    const session = await getServerSession(req, res, authOptions);

    if (!checkAuthorization(session, [Roles.ADMIN, Roles.SUPERADMIN, Roles.PUBLISHER])) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {

        const prisma = new PrismaClient();
        const { title, content, categoryId, draft } = req.body;

        // Validate the request body
        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }
        if (typeof title !== "string" || typeof content !== "string") {
            return res.status(400).json({ message: "Title and content must be strings" });
        }
        if (categoryId) {
            const existingCategory = await prisma.category.findFirst({
                where: {
                    id: categoryId,
                },
            });
            if (!existingCategory) {
                return res.status(400).json({ message: "Category does not exist" });
            }
        }

        console.log(session.user)
        // Create a new article
        const newArticle = await prisma.article.create({
            data: {
                title,
                content,
                timeToRead: calculateTimeToRead(content),
                category: { connect: {id: categoryId} },
                author: { connect: { email: session.user.email } }, // Add the author property
                isPublished: !draft,
            },
        }).catch((error) => {
            return res.status(400).json({ message: error.message });
        }).finally(async () => {
            await prisma.$disconnect();
        });

        if (!newArticle) {
            return res.status(500).json({ message: "Internal Server Error" });
        }
        return res.status(201).json(newArticle);


    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }


}
