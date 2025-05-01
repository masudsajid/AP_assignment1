import React from 'react'
import { useRouter } from 'next/router'

const index = () => {
    const router = useRouter();
    const route = router.query.slug;    
  return (
    <>
    <div className='py-2 px-4 text-blue-500 text-4xl text-center'>Try Harder! </div>
    </>
  )
}

export default index