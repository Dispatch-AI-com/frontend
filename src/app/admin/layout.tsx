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
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setReady(true);
  }, []);
  useEffect(() => {
    if (ready && !token) {
      router.replace(`/login`);
    }
  }, [ready, token, pathname, router]);

  if (!ready || !token) return null;
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
