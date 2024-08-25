import React, { ReactNode } from 'react'

function layout({
    children
}:{
    children:ReactNode
}) {
  return (
    <div className='flex items-center justify-center h-full bg-gradient-to-t from-stone-900 via-red-800 to-stone-900'>
        {children}
    </div>
  )
}

export default layout