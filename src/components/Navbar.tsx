import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import MenuIcon from "./icons/MenuIcon";
import useScrollCheck from "@/hooks/useScrollCheck";

function Navbar() {
  const [status, toggleMenu] = useState(false);
  const isScrolled = useScrollCheck();
  return (
    <header className={`bg-black p-1 bg-opacity-40 backdrop-blur-sm text-center top-0 w-full z-[100] ${isScrolled?"sticky mt-[-60px]":"absolute"}`}>
      <div className={`relative w-[200px] transition-all ease-linear duration-300 ${isScrolled?"mr-[100%] translate-x-[0%] h-[60px]":"ml-[50%] translate-x-[-50%] h-[80px]"}`}>
        <Image src={"/media/logo.png"} alt={"CaliHub"} fill objectFit="cover" />
      </div>

      <button
        onClick={() => toggleMenu((status) => !status)}
        className="absolute right-5 top-1/2 -translate-y-1/2 flex flex-col font-bold text-xl"
      >
        <MenuIcon />
      </button>
      <nav
        className={
          "text-white backdrop-blur-sm font-semibold text-2xl overflow-hidden transition-all duration-1000 flex flex-col justify-center align-middle absolute left-0 top-full w-full " +
          (status ? "ease-in max-h-[100rem]  " : "ease-out max-h-0")
        }
      >
        <Link
          className="p-4 bg-black bg-opacity-15 hover:bg-opacity-20 hover:animate-pulse"
          href={"/blog"}
        >
          Blog
        </Link>
        <Link
          className="p-4 bg-black bg-opacity-15 hover:bg-opacity-20 hover:animate-pulse pointer-events-none"
          href={"/tutorials"}
          aria-disabled
          
        >
          Tutorials (Coming soon)
        </Link>
        <Link
          className="p-4 bg-black bg-opacity-15 hover:bg-opacity-20 hover:animate-pulse pointer-events-none"
          href={"/coaching"}
          aria-disabled
        >
          Coaching (Coming soon)
        </Link>
        <Link
          className="p-4 bg-black bg-opacity-15 hover:bg-opacity-20 hover:animate-pulse pointer-events-none"
          href={"/contact"}
          aria-disabled
        >
          Contact
        </Link>
      </nav>
    </header>
  );
}

export default Navbar;
