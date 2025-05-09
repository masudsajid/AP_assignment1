import axios from "axios";
import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const index = ({ genres }) => {
  const router = useRouter();
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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-12 px-4">
      <div className="container mx-auto">
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
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-4 leading-[1.1] pb-2">
            Movie Genres
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Explore movies by their genres and discover new favorites
          </p>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {genres.map((genre, index) => (
            <motion.div
              key={genre.id}
              variants={item}
              whileHover={{ y: -10 }}
            >
              <Link 
                href={`/genres/${genre.id}`} 
                className="group block bg-gray-800/50 backdrop-blur-sm rounded-xl shadow-2xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl border border-gray-700/50 p-8"
              >
                <div className="text-indigo-400 text-sm font-medium mb-2">Genre ID: {genre.id}</div>
                <div className="text-2xl font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {genre.name}
                </div>
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <span className="text-gray-400 text-sm">Click to explore movies in this genre</span>
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

export async function getServerSideProps() {
  const genres = await axios.get("http://localhost:3000/api/genre");
  return {
    props: { genres: genres.data },
  };
}
