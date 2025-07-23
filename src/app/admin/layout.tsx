'use client';

import { Box } from '@mui/material';
import { createSelector } from '@reduxjs/toolkit';
import { skipToken } from '@reduxjs/toolkit/query';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

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

  const { token, user, isAuthenticated } = useAppSelector(selectAuthData);
  const userId = user?._id;
  const {
    data: progress, // { currentStep, answers, status }
    isFetching,
    error,
  } = useGetProgressQuery(userId ?? skipToken);
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
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
    isAuthenticated,
    token,
    user,
    router,
    pathname,
    isFetching,
    progress,
    error,
  ]);

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
          <Box mb={2}>Initializing User Dashboard...</Box>
          <Box>Loading your personal data...</Box>
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
      <Box flex={1} sx={{ ml: { xs: 0, sm: '30px', md: 0 } }}>
        {children}
      </Box>
    </Box>
  );
}
