// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Article } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { getHandler } from "./getHandler";
import { postHandler } from "./postHandler";
import { updateHandler } from "./updateHandler";
import { deleteHandler } from "./deleteHandler";


export type Data = {
  message: string;
} | { articles: Article[] } | Article;

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    try {
        switch (req.method) {
            case "GET":
                return getHandler(req, res);
            case "POST":
                return postHandler(req, res);
            case "PUT":
                return updateHandler(req, res);
            case "DELETE":
                return deleteHandler(req, res);

            default:
                return res.status(405).json({ message: "Method Not Allowed" });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}


