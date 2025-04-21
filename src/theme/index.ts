// theme/index.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

//color
//font-size
//padding
//responsive


let theme = createTheme({
  spacing: 8, // 默认 spacing 单位（8px）

  palette: {
    background: {
      default: '#f9f9f9',
      paper: '#ffffff',
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
      fontWeight: 700,
    },
    h2: {
      fontSize: '3.5rem',
      fontWeight: 700,
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700,
    },
    body1: {
      fontSize: '1.25rem',
    },
    body2: {
      fontSize: '1rem',
    },
    button: {
      fontSize: '0.75rem',
      fontWeight: 700,
    },
  },

  breakpoints: {
    values: {
      xs: 0,    // mobile devices (<768px)
      sm: 768,   // desktop (≥768px)
      md: 768,   // 保持与sm相同，实际不会用到
      lg: 768,   // 保持与sm相同，实际不会用到
      xl: 768,   // 保持与sm相同，实际不会用到
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
