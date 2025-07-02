// app/admin/layout.tsx
'use client';

import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import Sidebar from '@/components/layout/dashboard-layout/Sidebar';
import { useAppSelector } from '@/redux/hooks';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const token = useAppSelector(s => s.auth.token);
  const user = useAppSelector(s => s.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait for hydration and then check auth status
    const timer = setTimeout(() => {
      if (!token || !user) {
        router.replace(`/login`);
      } else {
        setReady(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [token, user, router, pathname]);

  if (!ready) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ visibility: 'hidden' }}
      >
        <Box textAlign="center">
          <Box mb={2}>Initializing Admin Panel...</Box>
          <Box>Loading user data and permissions...</Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      // border="5px solid black"
      boxSizing="border-box"
      overflow-x="auto"
    >
      <Sidebar />
      <Box flex={1}>{children}</Box>
    </Box>
  );
}
