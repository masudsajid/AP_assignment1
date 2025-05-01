import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
const index = ({ allMovies,genres }) => {
  const [movies,setMovies] = useState(allMovies);
  const handler=(value)=>{
    if(value!=='All'){
      const genreId = genres.find((g)=>g.name===value).id;
      const m = allMovies.filter((movie,index)=>movie.genreId===genreId);
      setMovies(m);
    }
    else{
      setMovies(allMovies)
    }
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          All Movies
        </h1>
        <div className="flex flex-row items-center justify-start gap-4">
          <Link
            href={"/"}
            className="rounded-lg bg-blue-500 hover:transition-transform hover:scale-105 py-2 px-4 text-white"
          >
            Trendy Movies
          </Link>
          <div className="">
            <label htmlFor="genres">Choose a genre: </label>
            <select 
              name="genres"
              id="genres"
              className="px-1 py-2 bg-transparent border rounded-lg"
              onChange={(e) => handler(e.target.value)}
            >
              <option value="All">All</option>
              <option value="Science Fiction">
                Science Fiction
              </option>
              <option value="Adventure">Adventure</option>
              <option value="Drama">Drama</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          {movies.map((movie, index) => (
            <Link
              key={movie.id || index}
              className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105"
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
    </div>
  );
};

export default index;

export async function getStaticProps() {
  const movies = await axios.get("http://localhost:3000/api/movies");
  const genres = await axios.get("http://localhost:3000/api/genre");
  if (!movies) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      allMovies: movies.data,
      genres:genres.data
    },
    revalidate: 20,
  };
}
