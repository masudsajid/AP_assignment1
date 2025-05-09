import { dbConnect, Movie } from '../../lib/mongodb';
import Director from '../../models/Director';

export default async function handler(req, res) {
  await dbConnect();
  if (req.method === 'POST') {
    const { id } = req.body;
    // Find the movie by ID to get the directorId
    const movie = await Movie.findOne({ _id: id });
    if (!movie) return res.status(404).json({ message: 'Movie not found' });
    // Find the director by directorId
    const director = await Director.findOne({ _id: movie.directorId });
    res.status(200).json(director);
  } else if (req.method === 'GET') {
    const directors = await Director.find({});
    res.status(200).json(directors);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}