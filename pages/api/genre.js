import { dbConnect, Movie } from '../../lib/mongodb';
import Genre from '../../models/Genre';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === "GET") {
    // Get all movies to find which genres are in use
    const movies = await Movie.find({});
    const usedGenreIds = [...new Set(movies.map(movie => movie.genreId))];
    
    // Only get genres that are referenced by movies
    const genres = await Genre.find({
      _id: { $in: usedGenreIds }
    });
    
    res.status(200).json(genres);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
