import { signIn } from 'next-auth/react'
import React from 'react'

function login() {
  return (
    <div onClick={
        ()=>{
            signIn("google", {
                callbackUrl:"/admin"
            })
        }
    }>login</div>
  )
}

export default login