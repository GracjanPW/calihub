import CreatorNav from '@/components/CreatorNav'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import {Roles} from "@/../.prisma/client"
 
function CreatorPage() {
  return (
    <>
    <CreatorNav/>
    <div>
       main
    </div>
    </>
  )
}


export default CreatorPage