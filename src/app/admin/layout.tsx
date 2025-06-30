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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && !token) {
      router.replace(`/login`);
    }
  }, [mounted, token, pathname, router]);

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

  return (
    <Box display="flex">
      <Sidebar />
      <Box flex={1}>{children}</Box>
    </Box>
  );
}
