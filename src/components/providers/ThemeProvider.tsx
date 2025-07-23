'use client';

import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';

import { createEmotionCache } from '@/lib/createEmotionCache';
import theme from '@/theme';

// Type assertion to fix React 19 compatibility
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
const EmotionCacheProvider = CacheProvider as any;

const clientSideEmotionCache = createEmotionCache();

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [emotionCache, setEmotionCache] = useState(clientSideEmotionCache);

  useEffect(() => {
    setIsMounted(true);
    // Ensure client uses its own cache
    setEmotionCache(createEmotionCache());
  }, []);

  // SSR 时不使用缓存，避免类名不匹配
  if (!isMounted) {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    );
  }

  return (
    <EmotionCacheProvider value={emotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </EmotionCacheProvider>
  );
}
