import React from 'react'
import Image from 'next/image'

function UserButton({
    imageUrl,
    username
}:{imageUrl?: string | null | undefined, username?:string | null | undefined}) {
  return (
    <button className="bg-[#1a1a1a] flex py-4 px-4 space-x-2 w-full items-center rounded-lg text-white">
    <div className="rounded-full overflow-hidden w-fit flex-shrink-0 ">
    <Image src={imageUrl? imageUrl: ""} alt="User" width={32} height={32}/>
    </div>
    <hr/>
    <div className="text-nowrap text-ellipsis overflow-hidden h-fit">
      {username}
    </div>
  </button>
  )
}

export default UserButton