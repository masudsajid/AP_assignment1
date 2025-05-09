import { dbConnect, Movie } from '../../../lib/mongodb';
import Genre from '../../../models/Genre';
import Director from '../../../models/Director';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Convert string id to ObjectId
      const movieId = new mongoose.Types.ObjectId(id);
      const movie = await Movie.findById(movieId);
      
      if (!movie) {
        return res.status(404).json({ message: 'Movie not found' });
      }

      // Get genre and director details
      const [genre, director] = await Promise.all([
        Genre.findById(movie.genreId),
        Director.findById(movie.directorId)
      ]);

      // Return movie with populated genre and director names
      res.status(200).json({
        ...movie.toObject(),
        genreName: genre ? genre.name : 'Unknown Genre',
        directorName: director ? director.name : 'Unknown Director'
      });
    } catch (error) {
      console.error('Error fetching movie:', error);
      res.status(500).json({ message: 'Error fetching movie' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 