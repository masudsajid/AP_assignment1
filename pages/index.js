import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext } from "react";
import { ThemeContext } from "./_app";
import { AppBar, Toolbar, Typography, Button, Container, Grid, Card, CardContent, CardActions, IconButton, Switch, Box } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export default function Home({ movies }) {
  const router = useRouter();
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Trending Movies
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 6 }}>
        <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
          <Button variant="contained" color="secondary" onClick={() => router.push('/genres')}>
            Browse Genres
          </Button>
          <Button variant="contained" color="primary" component={Link} href="/movies">
            All Movies
          </Button>
        </Box>
        <Grid container spacing={4}>
          {movies && movies.map((movie, index) => (
            <Grid item key={movie._id || index} xs={12} sm={6} md={4}>
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
}

export async function getStaticProps() {
  try {
    const response = await axios.get("http://localhost:3000/api/trendy");
    return {
      props: {
        movies: response.data || [],
      },
      revalidate: 20,
    };
  } catch (error) {
    console.error('Error fetching movies:', error);
    return {
      props: {
        movies: [],
      },
      revalidate: 20,
    };
  }
}