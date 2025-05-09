import { dbConnect, Movie } from '../../lib/mongodb';
import Genre from '../../models/Genre';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    // Get all movies to find which genres are in use
    const movies = await Movie.find({});
    const usedGenreIds = [...new Set(movies.map(movie => movie.genreId))];
    
    // Clear existing genres
    await Genre.deleteMany({});
    
    // Create genres only for those that are used by movies
    const genres = usedGenreIds.map(genreId => ({
      _id: genreId,
      name: genreId.charAt(0).toUpperCase() + genreId.slice(1), // Capitalize first letter
      description: `Movies in the ${genreId} genre`
    }));
    
    // Insert only the used genres
    await Genre.insertMany(genres);
    
    res.status(200).json({ 
      message: `Successfully seeded ${genres.length} genres.`
    });
  } catch (error) {
    console.error('Error seeding genres:', error);
    res.status(500).json({ 
      message: 'Error seeding genres', 
      error: error.message 
    });
  }
} 