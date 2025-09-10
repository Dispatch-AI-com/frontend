'use client';

import { Box, CircularProgress, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { useVerificationCheck } from '@/features/settings/hooks/useVerificationCheck';

interface VerificationGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export default function VerificationGuard({
  children,
  redirectTo = '/admin/settings',
}: VerificationGuardProps) {
  const router = useRouter();
  const { isFullyVerified, isLoading } = useVerificationCheck();

  useEffect(() => {
    if (!isLoading && !isFullyVerified) {
      router.push(redirectTo);
    }
  }, [isLoading, isFullyVerified, router, redirectTo]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="200px"
        gap={2}
      >
        <CircularProgress />
        <Typography variant="body2" color="text.secondary">
          Checking verification status...
        </Typography>
      </Box>
    );
  }

  if (!isFullyVerified) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="200px"
        gap={2}
      >
        <Typography variant="h6" color="text.secondary">
          Verification Required
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Redirecting to settings...
        </Typography>
      </Box>
    );
  }

  return <>{children}</>;
}
