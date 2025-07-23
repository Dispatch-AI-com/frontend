'use client';

import { CacheProvider } from '@emotion/react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';

import { createEmotionCache } from '@/lib/createEmotionCache';
import theme from '@/theme';

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
    // 确保客户端使用自己的缓存
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
    <CacheProvider value={emotionCache}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </CacheProvider>
  );
}
