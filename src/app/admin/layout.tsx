// app/admin/layout.tsx
'use client';

import { Box, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import Sidebar from '@/components/layout/dashboard-layout/Sidebar';
import { useAppSelector } from '@/redux/hooks';

export default function AdminLayout({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const token = useAppSelector(s => s.auth.token);
  const router = useRouter();
  const pathname = usePathname();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isMedium = useMediaQuery(theme.breakpoints.down('md'));

  // Set to ready immediately after startup
  useEffect(() => {
    setReady(true);
  }, []);

  // Jump out if not logged in
  useEffect(() => {
    if (ready && !token) {
      router.replace('/login');
    }
  }, [ready, token, pathname, router]);

  if (!ready || !token) return null;

  // Calculate sidebar width based on screen size
  const getSidebarWidth = () => {
    if (isMobile) return 0;
    if (isMedium) return 80; // collapsed sidebar width
    return 240; // full sidebar width
  };

  const sidebarWidth = getSidebarWidth();

  return (
    <Box display="flex" sx={{ minHeight: '100vh', overflow: 'hidden' }}>
      <Sidebar />
      <Box
        flex={1}
        sx={{
          marginLeft: `${sidebarWidth}px`,
          transition: 'margin-left 0.2s ease-in-out',
          minHeight: '100vh',
          width: `calc(100% - ${sidebarWidth}px)`,
          maxWidth: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
          backgroundImage: 'linear-gradient(to bottom, #effbf5, #fff 50%)',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            justifyContent: 'center',
            padding: '5px 0',
            '@media (min-width: 1920px)': {
              padding: '8px 0',
            },
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
