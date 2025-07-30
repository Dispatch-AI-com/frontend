// app/admin/layout.tsx
'use client';

import { Box } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import {
  useGetProgressQuery, // ← RTK-Query hook
} from '@/features/onboarding/onboardingApi';
import { useAppSelector } from '@/redux/hooks';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const token = useAppSelector(s => s.auth.token);
  const user = useAppSelector(s => s.auth.user);
  const userId = user?._id;
  const {
    data: progress, // { currentStep, answers, status }
    isFetching,
  } = useGetProgressQuery(userId ?? skipToken);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    // Wait for hydration and then check auth status
    const timer = setTimeout(() => {
      // check if logged in
      if (!token || !user) {
        router.replace('/login');
        return;
      }

      // check if onboarding finished
      if (isFetching || !progress) return;

      if (progress.status !== 'completed' && pathname !== '/onboarding') {
        router.replace('/onboarding');
        return;
      }

      setReady(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [token, user, router, pathname, isFetching, progress]);

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

  return <>{children}</>;
}
