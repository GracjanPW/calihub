import React from "react";
import Table from "../_components/Table";
import Div from "../_components/Div";
import prisma from "@/lib/db";
import {auth} from "@/auth/auth"


async function page() {
  const session = await auth();
  let blogs = await prisma.article.findMany({
    where: {
      author: {
        id:session?.user.id,
      }
    },
    select: {
      id: true,
      title: true,
      category: { select: { name: true } },
      isPublished: true,
      editedDate: true,
    },
  });
  const data = blogs.map((blog) => {
    return {
      id: blog.id,
      title: blog.title,
      category: blog.category?.name,
      isPublished: blog.isPublished ? "Published" : "Draft",
      editedDate: blog.editedDate?.toDateString(),
    };
  });

  return (
    <div className="flex flex-col h-full space-y-6">
      <div className="flex flex-row justify-between">
        <Div>
           Blogs
        </Div>
        <Div>
          <a href="/admin/blogs/new" className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
            New Blog
          </a>
        </Div>

      </div>
      <div className="rounded grow">
        <Table data={data} head={["id","title","category","isPublished","editedDate"]} />
      </div>
    </div>
  );
}

export default page;
