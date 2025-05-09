import { dbConnect, Movie } from '../../lib/mongodb';
import Director from '../../models/Director';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    await Movie.deleteMany({});
    await Director.deleteMany({});
    res.status(200).json({ message: 'Database cleared successfully' });
  } catch (error) {
    console.error('Error clearing database:', error);
    res.status(500).json({ message: 'Error clearing database' });
  }
} 