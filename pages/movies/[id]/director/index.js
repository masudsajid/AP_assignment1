import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useRouter } from "next/router";

const index = (props) => {
  const id = props.id;
  const [director, setDirector] = useState({});
  const router = useRouter();
  
  useEffect(() => {
    const fetchDirector = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/director",
          { id }
        );
        setDirector(response.data);
      } catch (err) {
        setError("Failed to fetch director data");
      }
    };
    fetchDirector();
  }, []);

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
              Director Details
            </motion.h1>
          </div>

          <div className="p-8 space-y-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="border-b border-gray-700/50 pb-6"
            >
              <label className="text-sm text-gray-400 font-medium">ID</label>
              <div className="text-xl font-bold text-white mt-1">{director.id}</div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="border-b border-gray-700/50 pb-6"
            >
              <label className="text-sm text-gray-400 font-medium">Name</label>
              <div className="text-xl font-bold text-white mt-1">{director.name}</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="text-sm text-gray-400 font-medium">Biography</label>
              <div className="text-gray-300 leading-relaxed mt-2">
                {director.biography}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default index;

export function getServerSideProps(context) {
  const id = context.query.id;
  return {
    props: {
      id,
    },
  };
}
