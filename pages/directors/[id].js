import React from "react";
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
  Box, 
  Paper,
  IconButton,
  Divider,
  Grid,
  Card,
  CardContent,
  CardActions
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';

const DirectorDetails = ({ director }) => {
  const router = useRouter();
  const { mode, toggleTheme } = useContext(ThemeContext);
  
  if (!director) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
              Director Details
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
            <Typography variant="h5">Director not found</Typography>
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
            Director Details
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
            bgcolor: 'background.paper',
            mb: 4
          }}
        >
          <Box sx={{ 
            bgcolor: 'primary.main',
            p: 3
          }}>
            <Typography variant="h4" component="h1" sx={{ color: 'white', fontWeight: 600 }}>
              {director.name}
            </Typography>
          </Box>
          <Box sx={{ p: 4 }}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Biography
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {director.biography || 'No biography available.'}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" sx={{ mb: 3 }}>
              Directed Movies
            </Typography>
            <Grid container spacing={3}>
              {director.movies && director.movies.map((movie) => (
                <Grid item key={movie._id} xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent>
                      <Typography gutterBottom variant="h6" component="div">
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
                            <Box sx={{ 
                              display: 'flex', 
                              alignItems: 'center',
                              bgcolor: 'primary.main', 
                              color: 'white', 
                              px: 1.5, 
                              py: 0.5, 
                              borderRadius: 2, 
                              fontSize: 14 
                            }}>
                              <StarIcon sx={{ fontSize: 16, mr: 0.5 }} />
                              {movie.rating}
                            </Box>
                          )}
                        </Box>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button 
                        size="small" 
                        color="primary" 
                        component={Link} 
                        href={`/movies/${movie._id}`}
                      >
                        View Details
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default DirectorDetails;

export async function getStaticProps(context) {
  try {
    const { id } = context.params;
    const response = await axios.get(`http://localhost:3000/api/directors/${id}`);
    return {
      props: { 
        director: response.data || null 
      },
      revalidate: 20
    };
  } catch (error) {
    console.error('Error fetching director:', error);
    return {
      props: { 
        director: null 
      },
      revalidate: 20
    };
  }
}

export async function getStaticPaths() {
  try {
    const response = await axios.get('http://localhost:3000/api/director');
    const directors = response.data || [];
    
    const paths = directors.map((director) => ({
      params: { id: director._id.toString() }
    }));

    return {
      paths,
      fallback: 'blocking'
    };
  } catch (error) {
    console.error('Error generating paths:', error);
    return {
      paths: [],
      fallback: 'blocking'
    };
  }
} 