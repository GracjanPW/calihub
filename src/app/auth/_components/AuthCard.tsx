import React, { ReactNode } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

import { Button } from "@/components/ui/button";
import Link from "next/link";

function AuthCard({
  children,
  title,
  backRef,
  backText,
}: {
  children: ReactNode;
  title: string;
  backRef: string;
  backText: string;
}) {
  return (
    <Card className="w-[400px] text-white bg-bg-dark-1 bg-opacity-65 backdrop-blur-md shadow-sm-light border-[#444141]">
      <CardHeader className="text-center">
        <CardTitle className="relative h-[40px] m-4">
          <Image src={"/media/logo.png"} alt="Logo" fill objectFit="cover" />
        </CardTitle>
        <CardDescription 
            className="font-bold text-[#cac5c5] text-xl"
        >{title}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter className="text-center">
        <Button asChild variant={"link"} className="w-full">
          <Link href={backRef} className="text-white ">
            {backText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}

export default AuthCard;
