import React from 'react'
import {
  Separator
} from "@/components/ui/separator"

function Divider({
  text
}:{
  text?:string
}) {
  if (!text) return <Separator/>

  return (
    <span className='flex space-x-2 w-full justify-center items-center my-2'>
      <Separator className='grow w-0'/>
      <p>{text}</p>
      <Separator className='grow w-0'/>
    </span>
  )
}

export default Divider