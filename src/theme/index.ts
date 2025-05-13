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
    },
    text: {
      primary: '#060606',
      secondary: '#6d6d6d',
    },
  },
  typography: {
    fontSize: 16,
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h1: { fontSize: 64, fontWeight: 900 },
    h2: { fontSize: 32, fontWeight: 900 },
    h3: { fontSize: 18, fontWeight: 700 },
    body1: { fontSize: 16 },
    body2: { fontSize: 14 },
    button: { fontSize: 16, fontWeight: 700 },
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
      md: 840,
      lg: 1080,
      xl: 1440,
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
          paddingLeft: baseTheme.spacing(2),
          paddingRight: baseTheme.spacing(2),
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
