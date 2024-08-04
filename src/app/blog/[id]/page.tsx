import prisma from "@/lib/db";
import React from "react";
import Image from "next/image";
import "@/styles/tiptap.scss";
import formatDate from "@/lib/formatDate";

async function ArticlePage({ params }: { params: any }) {
  const article = await prisma.article.findUnique({
    where: {
      id: params.id,
    },
    select: {
      id: true,
      title: true,
      content: true,
      timeToRead: true,
      publishDate: true,
      category: {
        select: {
          name: true,
        },
      },
      author:{
        select:{
          name:true
        }
      },
      banner: {
        select: {
          url: true,
        },
      },
    },
  });
  if (!article) return null;
  const im = ("/" + article.banner.url.replace(/\\/g, "/")).replace(
    "public/",
    ""
  );

  return article ? (
    <section className="pt-[7rem] w-full text-text-dark-base">

      <article className="max-w-2xl m-auto p-4">
        <h1 className="text-4xl font-bold mb-4">📰 {article.title}</h1>
        <p className="text-md">✍️ {article.author.name}</p>
        <div className="flex flex-row justify-end items-center space-x-2">
          <span className="bg-red-700 px-2 w-fit my-2 rounded-2xl font-semibold text-white">
            {article.category!.name}
          </span>
          <p>⌚{article.timeToRead}:00</p>
        <p>📅 {formatDate(new Date(article.publishDate!.toString()))}</p>
        </div>
        
        <br />

        <Image className="rounded" src={im} alt={article.title} width={800} height={400} />
        <br />
        <br />
        <div className="tiptap forceDarkTheme" dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>
    </section>
  ) : (
    <div>loading...</div>
  );
}
export async function generateStaticParams() {
  const posts = await prisma.article.findMany({
    select: {
      id: true,
      isPublished: true,
    },
  });

  return posts.map((post) => {
    if (post.isPublished === true)
      return {
        id: post.id,
      };
  });
}
export const dynamicParams = false;

export default ArticlePage;
