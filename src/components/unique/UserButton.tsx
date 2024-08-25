import Image from "next/image";
import { Button } from "../ui/button";
import { RxPerson } from "react-icons/rx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { RiSettings3Line } from "react-icons/ri";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RxExit } from "react-icons/rx";
import { Roles } from "@prisma/client";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { IoIosAt } from "react-icons/io";
import { Separator } from "../ui/separator";
function UserButton({
  imageUrl,
  username,
  role = Roles.USER,
}: {
  imageUrl?: string | null | undefined;
  username?: string | null | undefined;
  role?: Roles;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"user"}
          size={"user"}
          className="justify-start space-x-3 items-center"
        >
          <Avatar className="h-8 w-8 rounded-md">
            <AvatarImage src={imageUrl ? imageUrl : ""} />
            <AvatarFallback>{username![0].toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="text-nowrap font-semibold text-xl text-text-dark-base text-ellipsis overflow-hidden h-fit">
            {username}
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        sideOffset={16}
        align="end"
        side="right"
        className="flex flex-col space-y-2 w-fit p-2 bg-bg-dark-1 border-bg-dark-2"
      >
        <div className="flex justify-start items-center space-x-2">
         <Avatar className="h-8 w-8 rounded-md">
          <AvatarImage src={imageUrl ? imageUrl : ""} />
          <AvatarFallback>{username![0].toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="text-stone-300 text-sm">
          <p>{username}</p>
          <p>{role.toLowerCase()}</p>
        </div>
        </div>
        
        <Separator />
        {([Roles.OWNER, Roles.ADMIN] as string[]).includes(role) && (
          <Button
            className="space-x-2 justify-start p-2 pr-4 text-stone-300"
            variant={"ghost"}
          >
            <MdOutlineAdminPanelSettings size={24} />
            <span>Admin</span>
          </Button>
        )}
        {([Roles.OWNER, Roles.ADMIN, Roles.PUBLISHER] as string[]).includes(
          role
        ) && (
          <Button
            className="space-x-2 justify-start p-2 pr-4 text-stone-300"
            variant={"ghost"}
          >
            <IoIosAt size={24} />
            <span>Creator</span>
          </Button>
        )}

        <Button
          className="space-x-2 justify-start p-2 pr-4 text-stone-300"
          variant={"ghost"}
        >
          <RiSettings3Line size={24} />
          <span>Settings</span>
        </Button>
        <Button
          className="space-x-2 justify-start p-2 pr-4 text-stone-300 hover:bg-red-600 hover:text-stone-300"
          variant={"ghost"}
        >
          <RxExit size={24} />
          <span>Logout</span>
        </Button>
      </PopoverContent>
    </Popover>
  );
}

export default UserButton;
