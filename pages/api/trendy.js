import { dbConnect, Movie } from '../../lib/mongodb';

export default async function handler(req, res) {
  try {
    await dbConnect();
    if (req.method === 'GET') {
      // Find movies with rating >= 8.6
      const trendyMovies = await Movie.find({ rating: { $gte: 8.6 } });
      res.status(200).json(trendyMovies);
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error in trendy API:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
}