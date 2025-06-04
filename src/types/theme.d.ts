// types/theme.d.ts
import type {} from '@mui/material/styles';

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

  interface ThemeOptions {
    custom?: {
      containerWidth?: {
        sm?: number;
        md?: number;
        lg?: number;
        xl?: number;
      };
    };
  }
}
