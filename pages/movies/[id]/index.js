import React from "react";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "../../_app";
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  Box, 
  Paper,
  IconButton,
  Divider
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import StarIcon from '@mui/icons-material/Star';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const MovieDetails = ({ movie }) => {
  const router = useRouter();
  const { mode, toggleTheme } = useContext(ThemeContext);
  
  if (!movie) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
              Movie Details
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
            Back
          </Button>
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h5">Movie not found</Typography>
          </Paper>
        </Container>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            {movie.title}
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
          Back
        </Button>
        <Paper 
          elevation={3}
          sx={{ 
            overflow: 'hidden',
            bgcolor: 'background.paper'
          }}
        >
          <Box sx={{ 
            bgcolor: 'primary.main',
            p: 3
          }}>
            <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 600 }}>
              {movie.title}
            </Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Box sx={{ 
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 3,
              mb: 4
            }}>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">
                  Release Year
                </Typography>
                <Typography variant="body1">
                  {movie.releaseYear}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" color="text.secondary">
                  Genre
                </Typography>
                <Link 
                  href={`/genres/${movie.genreId}`}
                  style={{ textDecoration: 'none' }}
                >
                  <Typography 
                    variant="body1" 
                    sx={{ 
                      color: 'primary.main',
                      '&:hover': { textDecoration: 'underline' }
                    }}
                  >
                    {movie.genreName}
                  </Typography>
                </Link>
              </Box>
              {movie.directorId && (
                <Box>
                  <Typography variant="subtitle1" color="text.secondary">
                    Director
                  </Typography>
                  <Link 
                    href={`/directors/${movie.directorId}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <Typography 
                      variant="body1" 
                      sx={{ 
                        color: 'primary.main',
                        '&:hover': { textDecoration: 'underline' }
                      }}
                    >
                      {movie.directorName}
                    </Typography>
                  </Link>
                </Box>
              )}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Description
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {movie.description}
              </Typography>
            </Box>

            {movie.rating && (
              <Box sx={{ 
                display: 'inline-flex',
                alignItems: 'center',
                bgcolor: 'primary.main',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: 2
              }}>
                <StarIcon sx={{ mr: 1 }} />
                <Typography variant="h6">
                  {movie.rating} / 10
                </Typography>
              </Box>
            )}
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default MovieDetails;

export async function getServerSideProps(context) {
  try {
    const { id } = context.params;
    const response = await axios.get(`http://localhost:3000/api/movies/${id}`);
    return {
      props: { 
        movie: response.data || null 
      }
    };
  } catch (error) {
    console.error('Error fetching movie:', error);
    return {
      props: { 
        movie: null 
      }
    };
  }
}
