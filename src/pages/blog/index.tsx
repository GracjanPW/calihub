import Navbar from "@/components/Navbar";
import React from "react";
import Image from "next/image";
import FilterIcon from "@/components/icons/FilterIcon";
import SearchIcon from "@/components/icons/SearchIcon";

const data = [
  {
    id: 1,
    image_url: "/media/man doing push up.jpeg",
    title: "5 Best tips to get the most from pushups",
    author: "Gracjan Wojciechowski",
    publish_date: Date.parse("24/04/2024"),
    ttr: 5,
  },
];

function Page() {
  return (
    <main className="w-full">
      <Navbar />
      <section className="relative pt-[7rem] px-4 h-[2000px]">
        <form className="flex flex-row justify-between space-x-4">
          <button className="rounded-md text-center p-2 bg-red-700 text-white font-bold text-xl">
            <FilterIcon />
          </button>
          <input
            placeholder="Search"
            className="p-2 px-4 text-xl text-white rounded-md grow bg-[#292929]"
          />
          <button className="rounded-md text-center p-2 bg-red-700 text-white font-bold text-xl">
            <SearchIcon />
          </button>
        </form>
        <div className="">
          <h1 className="text-3xl text-white text-center my-4">Latest blogs</h1>

          <div className="px-2 grid grid-flow-row space-y-10">
            <article className="w-full bg-white text-[#dddbdb] bg-opacity-5 rounded-md overflow-hidden shadow-lg">
              <div className="relative w-full h-[200px]">
                <Image
                  src="/media/man doing push up.jpeg"
                  alt="cali"
                  layout="fill"
                  style={{ objectFit: "cover", objectPosition: "bottom" }}
                />
              </div>
              <div className="text-right p-3 flex flex-row justify-end space-x-4">
                <span className=" bg-red-700 px-2 rounded-2xl font-semibold text-white">
                  Tutorial
                </span>
                <p>⌚00:05</p>
                <p>📅 24/04/2024</p>
              </div>
              <div className="p-3">
                <h1 className="text-xl font-bold">
                  📰 5 Best tips to get the most from pushups
                </h1>
                <h2>✍️ Gracjan Wojciechowski</h2>
              </div>
            </article>
            <article className="w-full bg-white text-[#dddbdb] bg-opacity-5 rounded-md overflow-hidden shadow-lg">
              <div className="relative w-full h-[200px]">
                <Image
                  src="/media/man doing push up.jpeg"
                  alt="cali"
                  layout="fill"
                  style={{ objectFit: "cover", objectPosition: "bottom" }}
                />
              </div>
              <div className="text-right p-3 flex flex-row justify-end space-x-4">
                <span className=" bg-red-700 px-2 rounded-2xl font-semibold text-white">
                  Tutorial
                </span>
                <p>⌚00:05</p>
                <p>📅 24/04/2024</p>
              </div>
              <div className="p-3">
                <h1 className="text-xl font-bold">
                  📰 5 Best tips to get the most from pushups
                </h1>
                <h2>✍️ Gracjan Wojciechowski</h2>
              </div>
            </article>
            <article className="w-full bg-white text-[#dddbdb] bg-opacity-5 rounded-md overflow-hidden shadow-lg">
              <div className="relative w-full h-[200px]">
                <Image
                  src="/media/man doing push up.jpeg"
                  alt="cali"
                  layout="fill"
                  style={{ objectFit: "cover", objectPosition: "bottom" }}
                />
              </div>
              <div className="text-right p-3 flex flex-row justify-end space-x-4">
                <span className=" bg-red-700 px-2 rounded-2xl font-semibold text-white">
                  Tutorial
                </span>
                <p>⌚00:05</p>
                <p>📅 24/04/2024</p>
              </div>
              <div className="p-3">
                <h1 className="text-xl font-bold">
                  📰 5 Best tips to get the most from pushups
                </h1>
                <h2>✍️ Gracjan Wojciechowski</h2>
              </div>
            </article>
            <article className="w-full bg-white text-[#dddbdb] bg-opacity-5 rounded-md overflow-hidden shadow-lg">
              <div className="relative w-full h-[200px]">
                <Image
                  src="/media/man doing push up.jpeg"
                  alt="cali"
                  layout="fill"
                  style={{ objectFit: "cover", objectPosition: "bottom" }}
                />
              </div>
              <div className="text-right p-3 flex flex-row justify-end space-x-4">
                <span className=" bg-red-700 px-2 rounded-2xl font-semibold text-white">
                  Tutorial
                </span>
                <p>⌚00:05</p>
                <p>📅 24/04/2024</p>
              </div>
              <div className="p-3">
                <h1 className="text-xl font-bold">
                  📰 5 Best tips to get the most from pushups
                </h1>
                <h2>✍️ Gracjan Wojciechowski</h2>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Page;
