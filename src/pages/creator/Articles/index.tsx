import { authOptions } from '@/pages/api/auth/[...nextauth]'
import { PrismaClient, Roles } from '@prisma/client'
import { getServerSession } from 'next-auth'
import React from 'react'

function ArticlesPage({session, articles}) {
  return (
    <div>{articles.map((article)=>{
      return <div key={article.id}>{article.title}</div>
    }) }</div>
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
  const client = new PrismaClient()
  const articles = await client.article.findMany({
    where: {
      author: {
        email: session.user.email
      }
    }
  })

  client.$disconnect()
  return {
    props:{
      session,
      articles
    }
  }
}


export default ArticlesPage