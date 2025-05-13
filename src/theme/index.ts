import { createTheme, responsiveFontSizes } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      containerWidth: {
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
    };
  }
}

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

  custom: {
    containerWidth: {
      sm: 600,
      md: 840,
      lg: 1080,
      xl: 1440,
    },
  },

});


theme = createTheme(theme, {
  components: {
    MuiContainer: {
      defaultProps: {
        maxWidth: false,
      },
      styleOverrides: {
        root: {
          marginLeft: 'auto',
          marginRight: 'auto',
          [`@media (min-width:${theme.breakpoints.values.sm}px)`]: {
            maxWidth: theme.custom.containerWidth.sm,
          },
          [`@media (min-width:${theme.breakpoints.values.md}px)`]: {
            maxWidth: theme.custom.containerWidth.md,
          },
          [`@media (min-width:${theme.breakpoints.values.lg}px)`]: {
            maxWidth: theme.custom.containerWidth.lg,
          },
          [`@media (min-width:${theme.breakpoints.values.xl}px)`]: {
            maxWidth: theme.custom.containerWidth.xl,
          },
        },
      },
    },
  },
});

theme = responsiveFontSizes(theme);

export default theme;