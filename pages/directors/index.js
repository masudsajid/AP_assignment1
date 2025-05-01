import React from 'react'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then(res => res.json())
const index = () => {
    const { data,error,isLoading} = useSWR('/api/director', fetcher);
    if (error) return <div>Failed to load the data</div>
  if (isLoading) return <div>Loading...</div>
  return (
    <div className='m-4'>
      <div className='text-4xl font-bold tracking-tighter text-center'>All Directors</div>
      <div className='flex flex-row flex-wrap justify-center gap-4 '>{data.map((director,index)=>(
        <div className="bg-white w-1/5 mx-auto my-8 rounded-lg border overflow-hidden shadow-md">
        <h1 className="text-2xl font-bold p-4 text-gray-800 bg-blue-600 text-white shadow-md">
          Director Details
        </h1>
  
        <div className="space-y-4 p-6">
          <div className="border-b pb-4">
            <label className="text-sm text-gray-600">ID</label>
            <div className="text-lg font-medium">{director.id}</div>
          </div>
  
          <div className="border-b pb-4">
            <label className="text-sm text-gray-600">Name</label>
            <div className="text-lg font-medium">{director.name}</div>
          </div>
  
          <div>
            <label className="text-sm text-gray-600">Biography</label>
            <div className="text-gray-700 leading-relaxed mt-2">
              {director.biography}
            </div>
          </div>
        </div>
      </div>
      ))}</div>
    </div>
  )
}

export default index
