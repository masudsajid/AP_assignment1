import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "../_app";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Grid, 
  Card, 
  CardContent, 
  CardActions, 
  IconButton, 
  Box,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const Movies = ({ allMovies, genres }) => {
  const [movies, setMovies] = useState(allMovies);
  const [selectedGenre, setSelectedGenre] = useState('All');
  const router = useRouter();
  const { mode, toggleTheme } = useContext(ThemeContext);
  
  const handleGenreChange = (event) => {
    const value = event.target.value;
    setSelectedGenre(value);
    if (value !== 'All') {
      const filteredMovies = allMovies.filter((movie) => movie.genreName === value);
      setMovies(filteredMovies);
    } else {
      setMovies(allMovies);
    }
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Movie Collection
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 4, alignItems: 'center', justifyContent: 'center' }}>
          <Button variant="contained" color="secondary" onClick={() => router.push('/')}>
            Trendy Movies
          </Button>
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="genre-select-label">Filter by Genre</InputLabel>
            <Select
              labelId="genre-select-label"
              id="genre-select"
              value={selectedGenre}
              label="Filter by Genre"
              onChange={handleGenreChange}
            >
              <MenuItem value="All">All Genres</MenuItem>
              {genres.map((genre) => (
                <MenuItem key={genre._id} value={genre.name}>
                  {genre.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid item key={movie._id} xs={12} sm={6} md={4}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" sx={{ fontWeight: 600 }}>
                    {movie.title}
                  </Typography>
                  {movie.description && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {movie.description.substring(0, 100)}...
                    </Typography>
                  )}
                  {movie.releaseYear && (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 2 }}>
                      <Typography variant="caption" color="text.secondary">
                        Released: {movie.releaseYear}
                      </Typography>
                      {movie.rating && (
                        <Box sx={{ bgcolor: 'primary.main', color: 'white', px: 1.5, py: 0.5, borderRadius: 2, fontSize: 14 }}>
                          ★ {movie.rating}
                        </Box>
                      )}
                    </Box>
                  )}
                </CardContent>
                <CardActions>
                  <Button size="small" color="primary" component={Link} href={`/movies/${movie._id}`}>
                    View Details
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Movies;

export async function getStaticProps() {
  try {
    const [moviesResponse, genresResponse] = await Promise.all([
      axios.get("http://localhost:3000/api/movies"),
      axios.get("http://localhost:3000/api/genre")
    ]);

    return {
      props: {
        allMovies: moviesResponse.data || [],
        genres: genresResponse.data || []
      },
      revalidate: 20,
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        allMovies: [],
        genres: []
      },
      revalidate: 20,
    };
  }
}
