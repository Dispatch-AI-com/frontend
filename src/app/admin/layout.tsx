// app/admin/layout.tsx
'use client';

import { Box } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import { useCheckAuthStatusQuery } from '@/features/auth/authApi';
import {
  useGetProgressQuery, // ← RTK-Query hook
} from '@/features/onboarding/onboardingApi';
import { useAppSelector } from '@/redux/hooks';

export default function ProtectedLayout({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const isAuthenticated = useAppSelector(s => s.auth.isAuthenticated);
  const user = useAppSelector(s => s.auth.user);
  const userId = user?._id;

  // Check authentication status using cookies
  const { isLoading: isCheckingAuth } = useCheckAuthStatusQuery();

  const {
    data: progress, // { currentStep, answers, status }
    isFetching,
  } = useGetProgressQuery(userId ?? skipToken);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Wait for hydration and auth check, then check auth status
    const timer = setTimeout(() => {
      // Don't proceed if still checking authentication
      if (isCheckingAuth) {
        return;
      }

      // check if logged in
      if (!isAuthenticated || !user) {
        router.replace('/login');
        return;
      }

      // check if onboarding finished
      if (isFetching) {
        return;
      }

      // If no progress data, assume onboarding is not required or completed
      if (!progress) {
        setReady(true);
        return;
      }

      // Check if onboarding is completed
      if (progress.status !== 'completed' && pathname !== '/onboarding') {
        router.replace('/onboarding');
        return;
      }

      setReady(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [
    isAuthenticated,
    user,
    router,
    pathname,
    isFetching,
    progress,
    isCheckingAuth,
  ]);

  if (!ready || isCheckingAuth) {
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

  return <>{children}</>;
}
