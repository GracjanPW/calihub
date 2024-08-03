// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Article } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
export { GET } from "./getHandler";
export { POST } from "./postHandler";
export { PUT } from "./updateHandler";
export { DELETE } from "./deleteHandler";


export type Data = {
  message: string;
} | { articles: Article[] } | Article;
