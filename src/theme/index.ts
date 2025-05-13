// theme/index.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  spacing: 8,

  shape: {
    borderRadius: 12,
  },

  palette: {
    background: {
      default: '#ffffff', // white
      paper: '#fafafa', // light grey
    },
    text: {
      primary: '#060606', // black
      secondary: '#6d6d6d', // grey
    },
  },

  typography: {
    fontSize: 16,
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h1: {
      fontSize: 48,
      fontWeight: 900,
    },
    h2: {
      fontSize: 28,
      fontWeight: 900,
    },
    h3: {
      fontSize: 18,
      fontWeight: 700,
    },
    body1: {
      fontSize: 14,
    },
    body2: {
      fontSize: 13,
    },
    button: {
      fontSize: 14,
      fontWeight: 700,
    },
  },

  breakpoints: {
    values: {
      xs: 0,      // mobile devices
      sm: 600,    // tablets
      md: 900,    // small laptop
      lg: 1200,   // desktop
      xl: 1536    // large screens
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;