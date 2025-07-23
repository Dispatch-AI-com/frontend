'use client';

import { Box } from '@mui/material';
import { createSelector } from '@reduxjs/toolkit';
import { skipToken } from '@reduxjs/toolkit/query';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import { AuthGuard } from '@/components/AuthGuard';
import Sidebar from '@/components/layout/dashboard-layout/Sidebar';
import {
  useGetProgressQuery, // ← RTK-Query hook
} from '@/features/onboarding/onboardingApi';
import { useAppSelector } from '@/redux/hooks';
import type { RootState } from '@/redux/store';

// Memoized selector to prevent unnecessary re-renders
const selectAuthData = createSelector(
  (state: RootState) => state.auth,
  auth => ({
    token: auth.token,
    user: auth.user,
    isAuthenticated: auth.isAuthenticated,
  }),
);

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const { token, user, isAuthenticated } = useAppSelector(selectAuthData);
  const userId = user?._id;
  const {
    data: progress, // { currentStep, answers, status }
    isFetching,
    error,
  } = useGetProgressQuery(userId ?? skipToken);
  const router = useRouter();
  const pathname = usePathname();

  // Prevent hydration errors
  useEffect(() => {
    setIsMounted(true);
  }, []);
  useEffect(() => {
    if (!isMounted) return;

    // Wait for hydration and then check auth status
    const timer = setTimeout(() => {
      // check if logged in
      if (!isAuthenticated || !token || !user) {
        router.replace('/login');
        return;
      }

      if (isFetching) return;

      // If there's an error or no progress data, axiosBaseQuery will handle auth issues
      // Just redirect to onboarding if not there already
      if (error || !progress) {
        if (pathname !== '/onboarding') {
          router.replace('/onboarding');
        }
        return;
      }

      if (progress.status !== 'completed' && pathname !== '/onboarding') {
        router.replace('/onboarding');
        return;
      }

      setReady(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [
    isMounted,
    isAuthenticated,
    token,
    user,
    router,
    pathname,
    isFetching,
    progress,
    error,
  ]);

  if (!isMounted || !ready) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
        sx={{ visibility: 'hidden' }}
      >
        <Box textAlign="center">
          <Box mb={2}>Initializing User Dashboard...</Box>
          <Box>Loading your personal data...</Box>
        </Box>
      </Box>
    );
  }

  return (
    <AuthGuard>
      <Box
        display="flex"
        boxSizing="border-box"
        overflow-x="auto"
        sx={{ minHeight: '100vh' }}
      >
        <Sidebar />
        <Box
          flex={1}
          sx={{
            ml: {
              xs: 0,
              sm: '80px',
              md: '240px',
            },
            minHeight: '100vh',
            width: '100%',
            boxSizing: 'border-box',
            padding: { xs: 1, sm: 2, md: 3 },
          }}
        >
          {children}
        </Box>
      </Box>
    </AuthGuard>
  );
}
