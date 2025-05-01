import React from 'react'
import Link from 'next/link'
const index = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center  '>
        <div className='max-w-lg flex flex-col items-center justify-center border gap-6 p-4 rounded-lg'>
            <p className='text-5xl tracking-tight text-red-500'>Page Not Found!</p>
            <p className='tracking-tight'>We might not have what you are looking for, but watching a movie can never hurt. Click the button below to see our catalogue of trending movies</p>
            <Link href={'/'} className='py-2 px-4 bg-blue-600 text-white rounded-lg'>Go to Home</Link>
        </div>
    </div>
  )
}

export default index