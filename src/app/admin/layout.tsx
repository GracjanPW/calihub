import { redirect } from 'next/navigation'
import {Roles as PrismaRoles} from "@/../.prisma/client"
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import AdminSidebar from './_components/Sidebar'
import React from 'react'


async function layout({
    children
}:{children:React.ReactNode}) {
  const session = await getServerSession(authOptions)
  console.log(session) 
  if (session?.user.role != PrismaRoles.SUPERADMIN) {
    redirect("/login/admin")
  }
  return (
      <div className='w-full max-h-full flex flex-row'>
        <AdminSidebar/>
        <div className="grow">
          {children}
        </div>
        
    </div>

    
  )
}

export default layout