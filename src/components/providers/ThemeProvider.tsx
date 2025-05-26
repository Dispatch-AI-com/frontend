'use client';

import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';

import theme from '@/theme';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
