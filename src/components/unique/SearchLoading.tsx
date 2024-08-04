import { Spinner } from 'flowbite-react'
import React from 'react'

function SearchLoading() {
  return (
    <div className='w-full col-span-full'>
        <span className='text-center text-2xl text-text-dark-base'>Loading{" "}</span>
        <Spinner className='mx-auto' />
    </div>
  )
}

export default SearchLoading