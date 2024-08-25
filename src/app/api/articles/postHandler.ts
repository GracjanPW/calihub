import calculateTimeToRead from "@/lib/calculateTimeToRead";
import checkAuthorization from "@/lib/checkAuthorization";
import { Roles, PrismaClient, Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

import { Data } from "./route";
import {auth} from "@/auth/auth"
import fs from "fs";
import path from "path";
import saveFile from "@/lib/saveFile";
import prisma from '@/lib/db';

export async function POST(req: Request, res: NextApiResponse<Data>) {
  const session = await auth();
  if (!session) return res.status(401).json({ message: "Unauthorized" });
  if (
    !checkAuthorization(session, [
      Roles.ADMIN,
      Roles.OWNER,
      Roles.PUBLISHER,
    ])
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const form = await req.formData();
    const image = form.get("banner") as File;
    const title = form.get("title") as string;
    const content = form.get("content") as string;
    const categoryId = form.get("category") as string;
    const draft = !Boolean((form.get("isPublished") as string) === "on");

    if (!title || !content || !image) {
      const missing: string[] = [];
      if (!title) missing.push("title");
      if (!content) missing.push("content");
      if (!image) missing.push("image");
      return new Response(`Missing required fields: ${missing.join(", ")}`, {
        status: 400,
      });
    }

    if (image.type !== "image/png" && image.type !== "image/jpeg") {
      return new Response("File must be of type png or jpeg", { status: 400 });
    }

    if (image.size > 1024 * 1024 * 3) {
      return new Response("File size must be less than 3MB", { status: 400 });
    }
    // save the file
    const r = await saveFile(image);
    if (!r.url) {
      return new Response("Internal Server Error", { status: 500 });
    }

    console.log(r.url);

    const newArticle = await prisma.article.create({
        data: {
          title,
          content,
          banner: { create: { url: r.url, name:"image", user: {connect:{id:session.user.id}} } },
          timeToRead: calculateTimeToRead(content),
          category: { connect: { id: categoryId } },
          author: { connect: { id: session.user.id } }, 
          editedDate: new Date(),
          isPublished: !draft,
          publishDate: draft ? null : new Date(),
        },
      }).then((article) => {
        console.log(article);
      })
      .catch((error) => {
        console.log(error);
        return res.status(400).json({ message: error.message });
      })
      console.log("newArticle", newArticle);
  } catch (error) {
    console.log(error);
    return new Response("Internal Server Error", { status: 500 });
  } finally {
    return new Response("Hello, world!");
  }
}
