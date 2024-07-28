// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Article } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { GET } from "./getHandler";
import { POST } from "./postHandler";
import { PUT } from "./updateHandler";
import { DELETE } from "./deleteHandler";


export type Data = {
  message: string;
} | { articles: Article[] } | Article;

module.exports = {
    GET,
    POST,
    PUT,
    DELETE
}