import type { NextApiRequest, NextApiResponse } from "next";
import { Category } from "@prisma/client";
import { postHandler } from "./postHandler";
import { getHandler } from "./getHandler";
import { updateHandler } from "./updateHandler";
import { deleteHandler } from "./deleteHandler";

export type Data =
  | {
      categories: Category[];
    }
  | { message: string }
  | Category;



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
    return res.status(500).json({ message: "Internal Server Error" });
  }
  
}


