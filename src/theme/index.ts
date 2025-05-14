import { createTheme, responsiveFontSizes } from '@mui/material';

const baseTheme = createTheme({
  spacing: 8,
  shape: {
    borderRadius: 12,
  },
  palette: {
    background: {
      default: '#ffffff',
      paper: '#fafafa', 
      dark: '#000000', 
    },
    text: {
      primary: '#060606', 
      secondary: '#6d6d6d', 
    },
  },
  
  typography: {
    fontSize: 14,
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
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  custom: {
    containerWidth: {
      sm: 600,
      md: 888,
      lg: 1188,
      xl: 1488,
    },
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          overflowX: 'hidden',
        },
        body: {
          overflowX: 'hidden',
        },
      },
    },
  },
});

// Overwrite Container styles using custom values
const theme = createTheme(baseTheme, {
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
      styleOverrides: {
        root: {
          marginLeft: 'auto',
          marginRight: 'auto',
          
          [`@media (min-width:${baseTheme.breakpoints.values.sm}px)`]: {
            maxWidth: baseTheme.custom.containerWidth.sm,
          },
          [`@media (min-width:${baseTheme.breakpoints.values.md}px)`]: {
            maxWidth: baseTheme.custom.containerWidth.md,
          },
          [`@media (min-width:${baseTheme.breakpoints.values.lg}px)`]: {
            maxWidth: baseTheme.custom.containerWidth.lg,
          },
          [`@media (min-width:${baseTheme.breakpoints.values.xl}px)`]: {
            maxWidth: baseTheme.custom.containerWidth.xl,
          },
        },
      },
    },
  },
});

export default responsiveFontSizes(theme);
