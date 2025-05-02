// theme/index.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

// Extend the TypeBackground interface to include 'dark'
declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    dark: string;
  }
}

let theme = createTheme({
  spacing: 8,

  shape: {
    borderRadius: 12,
  },

  palette: {
    background: {
      default: '#ffffff', // default background color for the app
      paper: '#fafafa', // light gray
      dark: '#000000', // black
    },
    text: {
      primary: '#060606', // black
      secondary: '#6d6d6d', // dark gray
    },
  },

  typography: {
    fontSize: 16,
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h1: {
      fontSize: 64,
      fontWeight: 900,
    },
    h2: {
      fontSize: 32,
      fontWeight: 900,
    },
    h3: {
      fontSize: 18,
      fontWeight: 700,
    },
    body1: {
      fontSize: 16,
    },
    body2: {
      fontSize: 14,
    },
    button: {
      fontSize: 16,
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
