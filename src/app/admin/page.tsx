"use client";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";


function Page() {
  return (
    <h1>
      admin page
      <button onClick={()=>signOut()}>Logout</button>
    </h1>
  )
}



export default Page;
