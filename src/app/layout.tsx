import React from "react";
import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth/auth";

async function layout({ children }: { children: React.ReactNode }) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body>{children}</body>
      </html>
    </SessionProvider>
  );
}

export default layout;
