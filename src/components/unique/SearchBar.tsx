"use client";
import React from "react";
import FilterIcon from "../icons/FilterIcon";
import SearchIcon from "../icons/SearchIcon";
import { useRouter, useSearchParams } from "next/navigation";

function SearchBar() {
    const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("searching...");
    const search = e.target.search.value;
    router.replace("/blog?query=" + search)
  };
  const search = useSearchParams().get("query");
  return (
    <form
      className="flex flex-row justify-between space-x-4"
      onSubmit={handleSubmit}
    >
      <button type="button" className="rounded-md text-center p-2 bg-red-700 text-white font-bold text-xl">
        <FilterIcon />
      </button>
      <input
        placeholder="Search"
        name="search"
        defaultValue={search || ""}
        className="p-2 px-4 text-xl text-white rounded-md grow bg-[#292929]"
      />
      <button className="rounded-md text-center p-2 bg-red-700 text-white font-bold text-xl">
        <SearchIcon />
      </button>
    </form>
  );
}

export default SearchBar;
