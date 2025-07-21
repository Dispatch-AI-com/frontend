'use client';

import { Box } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/query';
import { usePathname, useRouter } from 'next/navigation';
import { type ReactNode, useEffect, useState } from 'react';

import Sidebar from '@/components/layout/dashboard-layout/Sidebar';
import {
  useGetProgressQuery, // ← RTK-Query hook
} from '@/features/onboarding/onboardingApi';
import { useAppSelector } from '@/redux/hooks';

export default function UserDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const [ready, setReady] = useState(false);

  const { token, user, isAuthenticated } = useAppSelector(s => ({
    token: s.auth.token,
    user: s.auth.user,
    isAuthenticated: s.auth.isAuthenticated,
  }));

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
      if (!isAuthenticated || !token || !user) {
        router.replace('/login');
        return;
      }

      if (isFetching || !progress) return;

      if (progress.status !== 'completed' && pathname !== '/onboarding') {
        router.replace('/onboarding');
        return;
      }

      setReady(true);
    }, 0);

    return () => clearTimeout(timer);
  }, [isAuthenticated, token, user, router, pathname, isFetching, progress]);

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
      <Box flex={1} sx={{ ml: { xs: 0, sm: '80px', md: '240px' } }}>
        {children}
      </Box>
    </Box>
  );
}
