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
    const movies = data.filter((movie, index) => movie.genreId === value);

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-900 py-12">
            <div className="container mx-auto px-4">
                <button
                  onClick={() => router.back()}
                  className="mb-8 flex items-center gap-2 text-indigo-300 hover:text-white transition-colors text-lg font-medium"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                  Back
                </button>
                <h1 className="text-5xl font-bold text-center text-white mb-12 tracking-tight leading-[1.1] pb-2">
                    Genre: {value}
                </h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {movies.map((movie, index) => (
                        <Link
                            key={movie.id || index}
                            className="group bg-gray-800 rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                            href={`/movies/${movie.id}`}
                        >
                            <div className="p-6">
                                <h2 className="text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors">
                                    {movie.title}
                                </h2>
                                {movie.description && (
                                    <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                                        {movie.description}
                                    </p>
                                )}
                                {movie.releaseYear && (
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700">
                                        <span className="text-sm text-gray-400">
                                            Released: {movie.releaseYear}
                                        </span>
                                        {movie.rating && (
                                            <span className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm font-medium">
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
        </div>
    )
}

export default index