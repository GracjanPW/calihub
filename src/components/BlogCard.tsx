import React from "react";
import Image from "next/image";
import Link from "next/link";
import formatDate from "@/lib/formatDate";



function BlogCard({
    data
}) {
  return (
    <Link href={`/blog/${data.id}`}>
    <article className="max-w-md h-full m-auto bg-white text-[#dddbdb] bg-opacity-5 rounded-md overflow-hidden shadow-lg hover:scale-[1.01] transition-transform ease-in">
      <div className="relative w-full h-[200px]">
        <Image
          src={("/" + data.banner.url.replace(/\\/g, "/")).replace("public/","")}
          alt="cali"
          layout="fill"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
      </div>
      <div className="text-right p-3 flex flex-row justify-end space-x-4">
        <span className=" bg-red-700 px-2 rounded-2xl font-semibold text-white">
          {data.category.name}
        </span>
        <p>⌚{data.timeToRead}:00</p>
        <p>📅 {formatDate(new Date(data.publishDate.toString()))}</p>
      </div>
      <div className="p-3">
        <h1 className="text-xl font-bold">
          📰 {data.title}
        </h1>
        <h2>✍️ {data.author.name}</h2>
      </div>
    </article>
    </Link>
  );
}

export default BlogCard;
