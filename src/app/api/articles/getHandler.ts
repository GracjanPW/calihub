import checkAuthorization from "@/lib/checkAuthorization";
import { Roles } from "@prisma/client";
import prisma from "@/lib/db";
import {auth} from "@/auth/auth"

export async function GET(req:Request, res) {
    const session = await auth();
    if (!session) return res.status(401).json({ message: "Unauthorized" });

    if (!checkAuthorization(session, [Roles.ADMIN, Roles.OWNER, Roles.PUBLISHER])) {
        return new Response("Unauthorized", { status: 401 });
    }
    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    if (!id) {
        return new Response("Bad Request, id not provided", { status: 400 });
    }
    const articles = await prisma.article.findUnique({
        where: {
            id: id,
        },
        select: {
            id: true,
            title: true,
            content: true,
            category: {
                select: {
                    name: true,
                    id: true,
                },
            },
            isPublished: true,
            banner: {
                select: {
                    url: true,
                },
            },
            }
        },
    );

    return new Response(JSON.stringify(articles), {
        headers: {
            "content-type": "application/json",
        },
    });
}
