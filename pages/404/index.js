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
  Paper,
  IconButton,
  Button
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const NotFoundPage = () => {
  const { mode, toggleTheme } = useContext(ThemeContext);

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
      <AppBar position="static" color="primary">
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, fontWeight: 700 }}>
            404 - Page Not Found
          </Typography>
          <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 6 }}>
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center', 
            bgcolor: 'background.paper',
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          <Typography variant="h4" color="error" sx={{ mb: 2 }}>
            Page Not Found!
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            We might not have what you are looking for, but watching a movie can never hurt. 
            Click the button below to see our catalogue of trending movies.
          </Typography>
          <Button 
            variant="contained" 
            color="primary" 
            component={Link} 
            href="/"
            size="large"
          >
            Go to Home
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default NotFoundPage;