'use client';

import { Alert, AlertTitle, Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import React from 'react';

import { useGetVerificationQuery } from '@/features/settings/settingsApi';

interface VerificationReminderProps {
  userId: string;
}

export default function VerificationReminder({
  userId,
}: VerificationReminderProps) {
  const router = useRouter();
  const { data: verificationData, isLoading } = useGetVerificationQuery(
    userId,
    {
      skip: !userId,
    },
  );

  if (isLoading || !verificationData) {
    return null;
  }

  // Check if both email and phone are verified
  const isFullyVerified =
    verificationData.emailVerified && verificationData.mobileVerified;

  if (isFullyVerified) {
    return null; // Don't show reminder if fully verified
  }

  const handleGoToSettings = () => {
    router.push('/admin/settings');
  };

  return (
    <Box sx={{ mb: 3 }}>
      <Alert
        severity="warning"
        sx={{
          borderRadius: 2,
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <AlertTitle>Verification Required</AlertTitle>
        <Typography variant="body2" sx={{ mb: 2 }}>
          To access all features and ensure account security, please verify your
          contact information:
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
          {!verificationData.emailVerified && (
            <Typography variant="body2" color="text.secondary">
              • Email: {verificationData.email ?? 'Not provided'} - Not verified
            </Typography>
          )}
          {!verificationData.mobileVerified && (
            <Typography variant="body2" color="text.secondary">
              • Phone: {verificationData.mobile ?? 'Not provided'} - Not
              verified
            </Typography>
          )}
        </Box>

        <Button
          variant="contained"
          size="small"
          onClick={handleGoToSettings}
          sx={{
            backgroundColor: '#ff9800',
            color: 'white',
            '&:hover': {
              backgroundColor: '#f57c00',
            },
          }}
        >
          Complete Verification
        </Button>
      </Alert>
    </Box>
  );
}
