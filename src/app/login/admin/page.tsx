"use client"

import Div from '@/app/admin/_components/Div'
import { signIn } from 'next-auth/react'
import React from 'react'

function login() {
  return (
    <div className='flex h-full w-full justify-center items-center'>
      <Div> <button onClick={
        ()=>{
            signIn("google", {
                callbackUrl:"/admin/dashboard"
            })
        }
    }>login</button></Div>
    </div>
    
  )
}

export default login