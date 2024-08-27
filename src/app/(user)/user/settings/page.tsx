import getUser from "@/actions/getUser";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import ChangePasswordForm from "@/components/unique/ChangePasswordForm";
import DeleteAccountButton from "@/components/unique/DeleteAccountButton";
import React from "react";

async function page() {
  const user = await getUser();
  return (
    <Card className="bg-bg-dark-1 border-bg-dark-2 text-stone-300 max-w-md w-full">
      <CardHeader>
        <CardTitle className="text-2xl">Settings</CardTitle>
        {/* <CardDescription>settings and that</CardDescription> */}
      </CardHeader>

      <CardContent className="space-y-2">
        <Separator />
        <h2 className="text-xl">User Details</h2>
        <div className="space-y-2">
          <FormatContent k="Id" value={user?.id} />
          <FormatContent k="Name" value={user?.name as string} />
          <FormatContent k="Email" value={user?.email as string} />
          <FormatContent k="Account" value={user?.role.toLowerCase()} />
        </div>
        <Separator />
        <ChangePasswordForm />
        <Separator />
      </CardContent>
      <CardFooter>
        <DeleteAccountButton/>
      </CardFooter>
    </Card>
  );
}

export default page;

function FormatContent({ k = "", value = "" }: { k?: string; value?: string }) {
  return (
    <div className="flex justify-between">
      <b>{k}</b>
      <span className="text-nowrap max-w-[150px] w-full overflow-hidden text-ellipsis bg-bg-dark-2 p-2 rounded-sm leading-3">
        {value}
      </span>
    </div>
  );
}
