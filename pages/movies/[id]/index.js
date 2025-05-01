import React from "react";
import axios from "axios";
import Link from "next/link";
const index = (props) => {
    const movie = props.movie
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-3xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          
          <div className="bg-blue-600 px-6 py-4">
            <h1 className="text-2xl font-bold text-white">{movie.title}</h1>
          </div>

         
          <div className="p-6 space-y-4">
           
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-semibold">ID:</span>
                <span className="text-gray-800">{movie.id}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-semibold">Director ID:</span>
                <Link className="text-blue-400 underline hover:text-blue-600 " href={`${movie.id}/director`}>{movie.directorId}</Link>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-semibold">Release Year:</span>
                <span className="text-gray-800">{movie.releaseYear}</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 font-semibold">Genre:</span>
                <span className="text-gray-800">{movie.genreId}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
              <p className="text-gray-600 leading-relaxed">{movie.description}</p>
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="inline-flex items-center bg-yellow-100 px-4 py-2 rounded-full">
                <svg className="w-5 h-5 text-yellow-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="font-semibold text-yellow-700">{movie.rating} / 10</span>
              </div>
            </div>
          </div>
        </div>
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
