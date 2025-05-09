import React from "react";
import axios from "axios";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const index = (props) => {
  const movie = props.movie;
  const router = useRouter();
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <button
          onClick={() => router.back()}
          className="mb-8 flex items-center gap-2 text-indigo-300 hover:text-white transition-colors text-lg font-medium"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
          Back
        </button>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden border border-gray-700/50"
        >
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 px-8 py-6">
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl font-bold text-white tracking-tight leading-[1.1] pb-2"
            >
              {movie.title}
            </motion.h1>
          </div>

          <div className="p-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 font-medium">ID:</span>
                <span className="text-white">{movie.id}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 font-medium">Director ID:</span>
                <Link 
                  className="text-indigo-400 hover:text-indigo-300 transition-colors" 
                  href={`${movie.id}/director`}
                >
                  {movie.directorId}
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 font-medium">Release Year:</span>
                <span className="text-white">{movie.releaseYear}</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-gray-400 font-medium">Genre:</span>
                <span className="text-white">{movie.genreId}</span>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="border-t border-gray-700/50 pt-6"
            >
              <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
              <p className="text-gray-400 leading-relaxed">{movie.description}</p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="border-t border-gray-700/50 pt-6"
            >
              <div className="inline-flex items-center bg-gradient-to-r from-indigo-500 to-purple-500 px-6 py-3 rounded-full shadow-lg">
                <svg className="w-6 h-6 text-white mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-bold text-white text-lg">{movie.rating} / 10</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default index;

export async function getStaticProps(context) {
  const id = context.params.id;
  console.log(id);
  const movie = await axios.post("http://localhost:3000/api/movies", { id });
  console.log(movie.data);
  return {
    props: { movie: movie.data },
  };
}

export const getStaticPaths = () => {
  return {
    paths: [
      {
        params: {
          id: "1",
        },
      },
      {
        params: {
          id: "2",
        },
      },
    ],
    fallback: "blocking", 
  };
};
