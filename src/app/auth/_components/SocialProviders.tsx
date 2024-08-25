import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { FaDiscord } from "react-icons/fa6";
import {
    Button
} from "@/components/ui/button"


function SocialProviders() {
  return (
    <div className='flex space-x-4 justify-stretch'>
        <Button className="w-full" variant="secondary"><FcGoogle size={24}/></Button>
        <Button className="w-full bg-slate-700" variant="ghost"><FaDiscord size={24} /></Button>
    </div>
  )
}

export default SocialProviders