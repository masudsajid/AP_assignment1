import { dbConnect, Movie } from '../../lib/mongodb';
import Genre from '../../models/Genre';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'GET') {
    try {
      const movies = await Movie.find({});
      
      // Get all genres
      const genres = await Genre.find({});
      const genreMap = genres.reduce((map, genre) => {
        map[genre._id] = genre.name;
        return map;
      }, {});

      // Add genre names to movies
      const moviesWithGenres = movies.map(movie => ({
        ...movie.toObject(),
        genreName: genreMap[movie.genreId] || 'Unknown Genre'
      }));

      res.status(200).json(moviesWithGenres);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ message: 'Error fetching movies' });
    }
  } else if (req.method === "POST") {
    const { id } = req.body;
    const movie = await Movie.findOne({ _id: id });
    res.status(200).json(movie);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
