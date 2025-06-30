// app/admin/layout.tsx
'use client';
import { Box } from '@mui/material';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import Sidebar from '@/components/layout/dashboard-layout/Sidebar';
import { useAppSelector } from '@/redux/hooks';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const token = useAppSelector(s => s.auth.token);
  const user = useAppSelector(s => s.auth.user);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && (!token || !user)) {
      router.replace(`/login`);
    }
  }, [mounted, token, user, pathname, router]);

  if (!mounted) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ visibility: 'hidden' }}
      >
        Loading...
      </Box>
    );
  }

  if (!token || !user) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Box textAlign="center">
          <Box mb={2}>Initializing Admin Panel...</Box>
          <Box>Loading user data and permissions...</Box>
        </Box>
      </Box>
    );
  }

  return (
    <Box display="flex">
      <Sidebar />
      <Box flex={1}>{children}</Box>
    </Box>
  );
}
