
import useWindowSize from "@/hooks/useWindowSize";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import Image from "next/image";
import UserButton from "./unique/UserButton";
import Divider from "./common/Divider";

function Navbar() {
  const { width } = useWindowSize();
  const { data:session} = useSession()



  if (width < 150)
    return (
    <h1>not implemented</h1>
  );
  return (
    <nav className="sticky float-left flex flex-col justify-between items-center h-[100vh] bg-[#212121] w-[250px] px-4">
        <div className="w-full my-4">
            <Image src={"/media/logo2.png"} alt={"CaliHub"} style={{margin:"auto"}} width={200} height={1}/>
        </div>
        
        <div className="grow w-full">
          <Divider/>
          <h1></h1>
          <Divider/>
          <Link href={"/creator"}>
            <div className="text-white text-center py-2 border-[#6b6b6b] bg-[#1f1f1f] border-[1px] rounded-lg mt-4 hover:scale-95 transition-transform ease-linear">
            Dashboard
            </div>
          </Link>
          <Link href={"/creator/articles"}>
            <div className="text-white text-center py-2 border-[#6b6b6b] bg-[#1f1f1f] border-[1px] rounded-lg mt-4 hover:scale-95 transition-transform ease-linear">
            My Articles
            </div>
            
          </Link>
          <Link href={"/creator/tutorials"}>
            <div className="text-white text-center py-2 border-[#6b6b6b] bg-[#1f1f1f] border-[1px] rounded-lg mt-4 hover:scale-95 transition-transform ease-linear">
            My Tutorials
            </div>
            
          </Link>
          <Link href={"/creator/coaching"}>
            <div className="text-white text-center py-2 border-[#6b6b6b] bg-[#1f1f1f] border-[1px] rounded-lg mt-4 hover:scale-95 transition-transform ease-linear">
            My Articles
            </div>
            
          </Link>
        </div>
        <div className="my-4">
          <UserButton imageUrl={session?.user.image} username={session?.user.name}/>
        </div>
    </nav>
  )
}


export default Navbar;
