import { dbConnect, Movie } from '../../lib/mongodb';

const sampleMovies = [
  {
    title: "The Shawshank Redemption",
    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    releaseYear: 1994,
    genreId: "drama",
    directorId: "frank-darabont",
    rating: 9.3
  },
  {
    title: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    releaseYear: 1972,
    genreId: "crime",
    directorId: "francis-ford-coppola",
    rating: 9.2
  },
  {
    title: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    releaseYear: 2008,
    genreId: "action",
    directorId: "christopher-nolan",
    rating: 9.0
  },
  {
    title: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    releaseYear: 1994,
    genreId: "crime",
    directorId: "quentin-tarantino",
    rating: 8.9
  },
  {
    title: "Forrest Gump",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75.",
    releaseYear: 1994,
    genreId: "drama",
    directorId: "robert-zemeckis",
    rating: 8.8
  }
];

export default async function handler(req, res) {
  try {
    await dbConnect();
    
    if (req.method === 'POST') {
      // Clear existing movies
      await Movie.deleteMany({});
      
      // Insert new movies
      const insertedMovies = await Movie.insertMany(sampleMovies);
      
      res.status(200).json({ 
        message: 'Movies seeded successfully',
        count: insertedMovies.length,
        movies: insertedMovies 
      });
    } else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Error seeding movies:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
} 