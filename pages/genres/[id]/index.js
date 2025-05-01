import { useRouter } from 'next/router'
import React from 'react'
import useSWR from 'swr'
import Link from 'next/link'

const fetcher = (url) => fetch(url).then(res => res.json())
const index = () => {
    const router = useRouter()
    const value = router.query.id;
    const { data, error, isLoading } = useSWR(`/api/movies`, fetcher)
 
    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    const movies = data.filter((movie,index)=>movie.genreId===value);
    console.log(movies);
  return (
    <div className='flex flex-col items-center justify-center gap-4 m-4'>
        <div className='text-4xl font-bold tracking-tighter'>Genre: {value}</div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
          {movies.map((movie, index) => (
            <Link
              key={movie.id || index}
              className="border rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
              href={`/movies/${movie.id}`}
            >
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {movie.title}
                </h2>
                {movie.description && (
                  <p className="text-gray-600 text-sm mb-4">
                    {movie.description.substring(0, 100)}...
                  </p>
                )}
                {movie.releaseYear && (
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      Released: {movie.releaseYear}
                    </span>
                    {movie.rating && (
                      <span className="bg-blue-500 text-white px-2 py-1 rounded-full text-sm">
                        ★ {movie.rating}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
        </div>
  )
}

export default index