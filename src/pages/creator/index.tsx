import CreatorNav from '@/components/CreatorNav'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]'
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

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)
  if (![Roles.PUBLISHER, Roles.SUPERADMIN].includes(session?.user.role)) {
    return {
      redirect: {
        destination: "/admin/login",
        permanent: false,
      },
    }
  }
  return {
    props:{
      session
    }
  }
}

export default CreatorPage