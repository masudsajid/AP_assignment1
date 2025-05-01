import axios from "axios";
import React from "react";
import Link from "next/link";
const index = ({  genres }) => {
  return (
    <div className="py-4 px-4">
      <div className="text-4xl font-bold tracking-tighter text-center">Select Desired Genre</div>
      <div className="mt-4 flex flex-wrap flex-row items-center justify-start gap-4">
        {genres.map((genre, index) => (
          <Link href={`/genres/${genre.id}`} className="hover:transition-transform hover:scale-105 p-4 shadow-md border rounded-lg min-w-80">
            <div className="text-blue-600 text-sm">{genre.id}</div>
            <div className="text-xl">{genre.name} </div>
          </Link>
        ))}
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
