import { dbConnect, Movie } from '../../lib/mongodb';
import Director from '../../models/Director';
import Genre from '../../models/Genre';
import mongoose from 'mongoose';

const OMDB_API_KEY = '45b7f355';

// Function to fetch movie details from OMDB API
async function fetchMovieDetails(imdbId) {
  const url = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${imdbId}&plot=full`;
  const response = await fetch(url);
  return response.json();
}

// Function to fetch director details and save to database
async function saveDirector(directorName) {
  if (!directorName) return null;

  // Check if director already exists
  let director = await Director.findOne({ name: directorName });
  
  if (!director) {
    // If director doesn't exist, create a new one
    // We could potentially fetch more details about the director from another API
    director = await Director.create({
      name: directorName,
      biography: `Film director known for their work in cinema.` // Default biography
    });
  }
  
  return director._id;
}

// Function to get or create genre
async function getOrCreateGenre(genreName) {
  if (!genreName) return null;

  // Check if genre exists
  let genre = await Genre.findOne({ name: genreName });
  
  if (!genre) {
    // If genre doesn't exist, create it
    genre = await Genre.create({
      name: genreName,
      description: `Movies in the ${genreName} genre.`
    });
  }
  
  return genre._id;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();

    // Clear existing data
    await Movie.deleteMany({});
    await Director.deleteMany({});
    await Genre.deleteMany({});

    // First, let's fetch top 250 movies from IMDB
    const searchTerms = ['drama', 'action', 'sci-fi', 'thriller'];
    const movies = [];
    
    for (const term of searchTerms) {
      const searchUrl = `https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${term}&type=movie&r=json`;
      const response = await fetch(searchUrl);
      const data = await response.json();
      
      if (data.Search) {
        movies.push(...data.Search.slice(0, 5)); // Get top 5 movies for each term
      }
    }

    let inserted = 0;
    const processedMovies = new Set();

    for (const movie of movies) {
      if (processedMovies.has(movie.imdbID)) continue;
      processedMovies.add(movie.imdbID);

      const movieDetails = await fetchMovieDetails(movie.imdbID);
      
      if (movieDetails && movieDetails.Response === 'True') {
        // Save director first
        const directorId = await saveDirector(movieDetails.Director);

        // Get or create genre
        const genreName = movieDetails.Genre ? movieDetails.Genre.split(',')[0].trim() : '';
        const genreId = await getOrCreateGenre(genreName);

        if (directorId && genreId) {
          // Create movie with proper ObjectIds
          await Movie.create({
            title: movieDetails.Title,
            description: movieDetails.Plot,
            releaseYear: parseInt(movieDetails.Year) || 0,
            genreId: new mongoose.Types.ObjectId(genreId),
            directorId: new mongoose.Types.ObjectId(directorId),
            rating: parseFloat(movieDetails.imdbRating) || 0,
            poster: movieDetails.Poster !== 'N/A' ? movieDetails.Poster : null,
            runtime: movieDetails.Runtime !== 'N/A' ? movieDetails.Runtime : null,
            actors: movieDetails.Actors !== 'N/A' ? movieDetails.Actors : null,
            awards: movieDetails.Awards !== 'N/A' ? movieDetails.Awards : null
          });
          
          inserted++;
        }
        // Add delay to respect API rate limits
        await new Promise(r => setTimeout(r, 1000));
      }
    }

    res.status(200).json({ 
      message: `Successfully seeded ${inserted} movies with their directors and genres.`
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    res.status(500).json({ 
      message: 'Error seeding database', 
      error: error.message 
    });
  }
} 