import prisma from "@/lib/db";
import React from "react";
import BlogCard from "../BlogCard";
import { set } from "zod";
import { time } from "console";

async function Blogs({ query=""}) {
  const blogs = await prisma.article.findMany({
    where: {
      isPublished: true,
      OR: [
        {
          title: {
            contains: query ? query : "",
          },
        },
        {
          content: {
            contains: query ? query : "",
          },
        },
        {
          category: {
            name: {
              contains: query ? query : "",
            },
          },
        },
      ],
    },
    select: {
      id: true,
      title: true,
      category: { select: { name: true } },
      banner: { select: { url: true } },
      publishDate: true,
      timeToRead: true,
      author: { select: { name: true } },
    },
  });
  return (
    <>
      {blogs.map((blog) => (
        <BlogCard key={blog.id} data={blog} />
      ))}
    </>
  );
}

export default Blogs;
