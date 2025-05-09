import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext } from 'react';
import { ThemeContext } from '../../_app';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  IconButton
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const GenreDetails = ({ movies, genreName }) => {
  const router = useRouter();
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {genreName} Movies
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 6 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 4 }}
        >
          Back to Genres
        </Button>
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

export default GenreDetails;

export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    const response = await fetch(`http://localhost:3000/api/genres/${id}/movies`);
    const data = await response.json();
    return {
      props: {
        movies: data.movies || [],
        genreName: data.genreName || 'Unknown Genre'
      }
    };
  } catch (error) {
    console.error('Error fetching genre movies:', error);
    return {
      props: {
        movies: [],
        genreName: 'Unknown Genre'
      }
    };
  }
}