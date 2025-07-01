'use client';

import { Box, useTheme } from '@mui/material';
import { useEffect } from 'react';

import Sidebar from '@/components/layout/dashboard-layout/Sidebar';

import PageTitle from './components/PageTitle';

export default function Layout({ children }: { children: React.ReactNode }) {
  const theme = useTheme();

  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, []);

  return (
    <Box
      sx={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: { xs: 0, sm: 240 },
          flexShrink: 0,
          overflowY: 'auto',
          bgcolor: 'background.paper',
          borderRight: { xs: 'none', sm: `1px solid ${theme.palette.divider}` },
          transition: 'width 0.2s',
        }}
      >
        <Sidebar />
      </Box>
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          component="main"
          sx={{
            flex: 1,
            overflowY: 'auto',
            px: 3,
            py: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '80px',
          }}
        >
          {children}
        </Box>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          top: 24,
          left: { xs: 'auto', sm: 240 + 24 },
          right: { xs: 24, sm: 'auto' },
          zIndex: theme.zIndex.appBar,
          pointerEvents: 'none',
        }}
      >
        <PageTitle />
      </Box>
    </Box>
  );
}
