
import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa6";
import {
    Button
} from "@/components/ui/button"

import { DEFAULT_AUTH_REDIRECT } from '@/routes';
import { signIn } from 'next-auth/react';


function SocialProviders() {
  function login(prov){
    signIn(prov,{
      redirectTo:DEFAULT_AUTH_REDIRECT
    })
  }
  return (
    <div className='flex space-x-4 justify-stretch'>
        <Button className="w-full" variant="secondary"
          onClick={()=>login("google")}
        ><FcGoogle size={24}/></Button>
        <Button className="w-full bg-slate-700" variant="ghost"><FaDiscord size={24} /></Button>
    </div>
  )
}

export default SocialProviders