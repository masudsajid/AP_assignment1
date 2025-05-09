import React from 'react';
import Link from 'next/link';
import { useContext } from 'react';
import { ThemeContext } from '../_app';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Container, 
  Box, 
  Grid,
  Card,
  CardContent,
  CardActionArea,
  IconButton
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const GenresPage = ({ genres }) => {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Movie Genres
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 6 }}>
        <Grid container spacing={4}>
          {genres.map((genre) => (
            <Grid item key={genre._id} xs={12} sm={6} md={4}>
              <Card 
                sx={{ 
                  height: '100%',
                  bgcolor: 'background.paper',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <CardActionArea 
                  component={Link} 
                  href={`/genres/${genre._id}`}
                  sx={{ height: '100%' }}
                >
                  <CardContent>
                    <Typography variant="subtitle2" color="primary" sx={{ mb: 1 }}>
                      Genre ID: {genre._id}
                    </Typography>
                    <Typography variant="h5" component="div" sx={{ mb: 2 }}>
                      {genre.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Click to explore movies in this genre
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default GenresPage;

export async function getStaticProps() {
  try {
    const response = await fetch('http://localhost:3000/api/genre');
    const genres = await response.json();
    return {
      props: {
        genres: genres || []
      },
      revalidate: 20
    };
  } catch (error) {
    console.error('Error fetching genres:', error);
    return {
      props: {
        genres: []
      },
      revalidate: 20
    };
  }
}
