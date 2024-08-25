import { authOptions } from "@/app/api/auth/[...nextauth]/route";
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


export default ArticlesPage