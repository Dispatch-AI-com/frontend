// theme/index.ts
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

interface ThemeColors {
  background: {
    default: string;
    paper: string;
    dark: string;
    light: string;
  };
  text: {
    primary: string;
    secondary: string;
    white: string;
  };
  button: {
    primary: {
      background: string;
      text: string;
      hover: string;
    };
    secondary: {
      background: string;
      text: string;
      hover: string;
    };
  };
}

const lightTheme: ThemeColors = {
  background: {
    default: '#ffffff',
    paper: '#fafafa',
    dark: '#060606',
    light: '#f0f0f0',
  },
  text: {
    primary: '#060606',
    secondary: '#6d6d6d',
    white: '#ffffff',
  },
  button: {
    primary: {
      background: '#060606',
      text: '#ffffff',
      hover: '#1a1a1a',
    },
    secondary: {
      background: '#ffffff',
      text: '#060606',
      hover: '#fafafa',
    },
  },
};

const darkTheme: ThemeColors = {
  background: {
    default: '#060606',
    paper: '#1a1a1a',
    dark: '#060606',
    light: '#f0f0f0',
  },
  text: {
    primary: '#ffffff',
    secondary: '#a0a0a0',
    white: '#ffffff',
  },
  button: {
    primary: {
      background: '#ffffff',
      text: '#060606',
      hover: '#f0f0f0',
    },
    secondary: {
      background: '#060606',
      text: '#ffffff',
      hover: '#1a1a1a',
    },
  },
};

declare module '@mui/material/styles' {
  interface Palette extends ThemeColors {}
  interface PaletteOptions extends ThemeColors {}
}

let theme = createTheme({
  spacing: 8, 

  shape: {
    borderRadius: 12, 
  },

  palette: {
    ...lightTheme,
    mode: 'light',
  },

  typography: {
    fontSize: 16,
    fontFamily: ['Roboto', 'sans-serif'].join(','),
    h1: {
      fontSize: 72,
      fontWeight: 900,
    },
    h2: {
      fontSize: 48,
      fontWeight: 900,
    },
    h3: {
      fontSize: 24,
      fontWeight: 700,
    },
    body1: {
      fontSize: 20,
    },
    body2: {
      fontSize: 16,
    },
    button: {
      fontSize: 18,
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

export const createAppTheme = (mode: 'light' | 'dark') => {
  const baseTheme = createTheme({
    ...theme,
    palette: {
      ...theme.palette,
      ...(mode === 'dark' ? darkTheme : lightTheme),
      mode,
    },
  });

  return responsiveFontSizes(baseTheme);
};

export default theme;
