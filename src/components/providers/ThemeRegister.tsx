// src/components/ThemeRegistry.tsx

'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from '@/theme';

// 创建 Emotion 缓存
const emotionCache = createCache({ key: 'css', prepend: true });

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  useServerInsertedHTML(() => {
    return (
      <style
        data-emotion={`${emotionCache.key}`}
        dangerouslySetInnerHTML={{
          __html: emotionCache.sheet.tags.map(tag => tag.textContent).join(''),
        }}
      />
    );
  });

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </CacheProvider>
  );
}