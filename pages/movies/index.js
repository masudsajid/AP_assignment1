import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const index = ({ allMovies, genres }) => {
  const [movies, setMovies] = useState(allMovies);
  const router = useRouter();
  
  const handler = (value) => {
    if (value !== 'All') {
      const genreId = genres.find((g) => g.name === value).id;
      const m = allMovies.filter((movie) => movie.genreId === genreId);
      setMovies(m);
    } else {
      setMovies(allMovies);
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-indigo-300 hover:text-white transition-colors text-lg font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 leading-tight">
            Movie Collection
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore our extensive collection of movies across various genres
          </p>
        </motion.div>

        <div className="flex flex-row items-center justify-center gap-6 mb-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              href={"/"}
              className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 transition-all duration-300 py-3 px-8 text-white font-medium shadow-lg hover:shadow-xl"
            >
              Trendy Movies
            </Link>
          </motion.div>
          <div className="flex items-center gap-3">
            <label htmlFor="genres" className="text-white font-medium">Filter by genre:</label>
            <select 
              name="genres"
              id="genres"
              className="px-4 py-2 bg-gray-800/70 backdrop-blur-sm text-white border border-gray-700/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none pr-8"
              style={{ minWidth: '150px' }}
              onChange={(e) => handler(e.target.value)}
            >
              <option value="All">All Genres</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Adventure">Adventure</option>
              <option value="Drama">Drama</option>
              <option value="Thriller">Thriller</option>
            </select>
          </div>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {movies.map((movie, index) => (
            <motion.div
              key={movie.id || index}
              variants={item}
              whileHover={{ y: -10 }}
            >
              <Link
                className="group block bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl border border-gray-700/50"
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
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-700/50">
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
            </motion.div>
          ))}
        </motion.div>
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
