import { redirect } from 'next/navigation'
import {Roles as PrismaRoles} from "@/../.prisma/client"
import {auth} from "@/auth/auth"
import AdminSidebar from './_components/Sidebar'
import React from 'react'
import UserMenu from './_components/UserMenu'
import { CustomFlowbiteTheme, DarkThemeToggle, Flowbite } from 'flowbite-react';
import getUser from '@/actions/getUser'
import checkAuthorization from '@/lib/checkAuthorization'

const DarkThemeToggleTheme : CustomFlowbiteTheme['darkThemeToggle'] = { 
  root: {
    base: 'p-4',
    icon: 'h-6 w-6'
  },

}
async function layout({
    children
}:{children:React.ReactNode}) {
  const user = await getUser()
  if (!checkAuthorization({user}, [
    PrismaRoles.OWNER,
    PrismaRoles.ADMIN
  ])) {
    redirect("/login/admin")
  }
  return (
    <Flowbite>
      <div className='w-full max-h-full flex flex-row p-4 space-x-4 bg-bg-light-page dark:bg-bg-dark-page '>
        <AdminSidebar/>
        
        <div className="grow flex flex-col h-full space-y-4">
          <div className='flex justify-end p-2 space-x-4 rounded-md'>
            <DarkThemeToggle className="hover:bg-text-dark-hover dark:hover:bg-text-light-hover text-text-dark-base dark:focus:ring-bg-dark-1"/>
            <UserMenu/>
          </div>
          <div className='grow min-h-0 overflow-auto scroll-smooth'>
            {children}
          </div>
          
        </div>
        
    </div>
    </Flowbite>
    
  )
}

export default layout