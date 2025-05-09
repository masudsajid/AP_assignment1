import "@/styles/globals.css";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { useEffect, useMemo, useState, createContext, useContext } from 'react';

export const ThemeContext = createContext();

export default function App({ Component, pageProps }) {
  const [mode, setMode] = useState('dark');

  useEffect(() => {
    const stored = localStorage.getItem('themeMode');
    if (stored) setMode(stored);
  }, []);

  const toggleTheme = () => {
    setMode((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark';
      localStorage.setItem('themeMode', next);
      return next;
    });
  };

  const theme = useMemo(() => createTheme({
    palette: {
      mode,
      primary: { main: '#7c3aed' },
      secondary: { main: '#f50057' },
    },
  }), [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Component {...pageProps} />
      </ThemeProvider>
    </ThemeContext.Provider>
  );
}
