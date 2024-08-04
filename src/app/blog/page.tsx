import React, { Suspense } from "react";

import Blogs from "@/components/unique/Blogs";
import SearchBar from "@/components/unique/SearchBar";
import SearchLoading from "@/components/unique/SearchLoading";

async function Page({
  searchParams,
}: {
  searchParams: {
    query: string;
  };
}) {
  console.log(searchParams.query);
  return (
    <section className="relative pt-[7rem] px-4 h-[2000px]">
      <SearchBar />
      <div className="">
        <h1 className="text-3xl text-white text-center my-4">Latest blogs</h1>

        <div className="px-2 grid grid-flow-row gap-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 m-auto max-w-fit">
          <Suspense fallback={<SearchLoading/>} key={searchParams.query} >
            <Blogs query={searchParams.query} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}

export default Page;
