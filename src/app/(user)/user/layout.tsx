import getUser from '@/actions/getUser'
import UserButton from '@/components/unique/UserButton'
import React from 'react'
import Image from "next/image"
import { AspectRatio } from '@/components/ui/aspect-ratio'
import Link from 'next/link'
import { Button } from '@/components/ui/button'


async function layout() {
  const user = await getUser()
  return (
    <div className='p-4 space-x-4 flex flex-row h-full'>
        <div className='flex flex-col justify-between h-full bg-bg-dark-1 p-2 max-w-40 w-full'>
            <AspectRatio ratio={2/1}>
              <Image src="/media/logo.png" alt="logo" fill className='object-cover'/>
            </AspectRatio>
            <div className='grow space-y-2'>
              <Button className='w-full justify-start'>
                <Link href="/user">
                  ddgfg                
                </Link>
              </Button>
              <Button className='w-full justify-start'>
                <Link href="/user">
                  ddgfg                
                </Link>
              </Button>
              <Button className='w-full justify-start'>
                <Link href="/user">
                  ddgfg                
                </Link>
              </Button>

            </div>
            <UserButton imageUrl={user?.image} username={user?.name} role={user?.role} />
        </div>
        <div className='grow'>

        </div>
    </div>
  )
}

export default layout