import { signOut, useSession } from "next-auth/react";

import React, { useEffect } from "react";
import {Roles as PrismaRoles} from "@/../.prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";

function Page() {
  return (
    <h1>
      admin page
      <button onClick={()=>signOut()}>Logout</button>
    </h1>
  )
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  console.log(session) 
  if (session?.user.role != PrismaRoles.SUPERADMIN) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}


export default Page;
