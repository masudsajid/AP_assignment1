import { dbConnect, Movie } from '../../../../lib/mongodb';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;
  if (req.method === 'GET') {
    const movies = await Movie.find({ genreId: id });
    res.status(200).json(movies);
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
} 