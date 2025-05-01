import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
export default function Home({movies}) {
  const router = useRouter();
  const func = () => {
    router.push("/genres");
  };
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Trending Movies
        </h1>
        <div className="flex flex-row items-center justify-start">
        <button
          onClick={func}
          className="rounded-lg bg-blue-500 hover:transition-transform hover:scale-105 py-2 px-4 text-white mb-4"
        >
          Browse Genres
        </button>
        <Link
         href={'/movies'}
          className="rounded-lg ml-2 bg-blue-500 hover:transition-transform hover:scale-105 py-2 px-4 text-white mb-4"
        >
          All Movies
        </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
}

export async function getStaticProps() {
  const movies = await axios.get("http://localhost:3000/api/trendy");
  if(!movies){
    return {
      notFound:true,
    }
  } 
  return {
    props: {
      movies:movies.data
    },revalidate:20,
  };
}