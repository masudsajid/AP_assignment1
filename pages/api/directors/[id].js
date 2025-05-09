import { dbConnect, Movie } from '../../../lib/mongodb';
import Director from '../../../models/Director';
import mongoose from 'mongoose';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      // Convert string id to ObjectId
      const directorId = new mongoose.Types.ObjectId(id);
      const director = await Director.findById(directorId);
      
      if (!director) {
        return res.status(404).json({ message: 'Director not found' });
      }

      // Find all movies by this director
      const movies = await Movie.find({ directorId: directorId });

      // Return director info along with their movies
      res.status(200).json({
        ...director.toObject(),
        movies: movies
      });
    } catch (error) {
      console.error('Error fetching director:', error);
      res.status(500).json({ message: 'Error fetching director' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 