// theme/index.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

let theme = createTheme({
  spacing: 8, 

  shape: {
    borderRadius: 12, 
  },

  palette: {
    background: {
      default: '#ffffff',
      paper: '#fafafa',
    },
    text: {
      primary: '#060606',
      secondary: '#6d6d6d',
    },
  },


  typography: {
    fontSize: 16,
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h1: {
      fontSize: '4.5rem',
      fontWeight:800,
    },
    h2: {
      fontSize: '3.5rem',
      fontWeight: 800,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 800,
    },
    body1: {
      fontSize: '1.25rem',
    },
    body2: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '0.9rem',
      fontWeight: 600,
    },
  },

  breakpoints: {
    values: {
      xs: 0,    // mobile devices (<768px)
      sm: 768,   // desktop (≥768px)
      md: 768,   
      lg: 768,   
      xl: 768,   
    },
  },

  components: {
    MuiContainer: {
      styleOverrides: {
        root: {
          paddingLeft: '16px',
          paddingRight: '16px',
          '@media (min-width:768px)': { 
            paddingLeft: '64px',
            paddingRight: '64px',
          },
        },
      },
    },
  },
});


theme = responsiveFontSizes(theme);

export default theme;
