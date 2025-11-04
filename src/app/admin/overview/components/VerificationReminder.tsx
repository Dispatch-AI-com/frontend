'use client';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Chip,
  Typography,
} from '@mui/material';
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

  const unverifiedCount = [
    !verificationData.emailVerified,
    !verificationData.mobileVerified,
  ].filter(Boolean).length;

  return (
    <Box sx={{ mb: 3 }}>
      <Alert
        severity="warning"
        sx={{
          borderRadius: 2,
          border: '2px solid #ff9800',
          backgroundColor: '#fff8e1',
          '& .MuiAlert-message': {
            width: '100%',
          },
        }}
      >
        <AlertTitle sx={{ color: '#f57c00', fontWeight: 'bold' }}>
          ⚠️ Account Verification Required - {unverifiedCount} Item
          {unverifiedCount > 1 ? 's' : ''} Pending
        </AlertTitle>

        <Typography variant="body1" sx={{ mb: 2, fontWeight: 500 }}>
          <strong>Important:</strong> Your account requires verification to
          access all features and ensure security.
          <br />
          <strong>Impact:</strong> Some operations are currently blocked until
          verification is complete.
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5, mb: 3 }}>
          {!verificationData.emailVerified && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label="UNVERIFIED"
                sx={{ 
                  backgroundColor: '#ff9800',
                  color: 'white',
                  fontWeight: 'bold' 
                }}
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                Email: {verificationData.email ?? 'Not provided'}
              </Typography>
            </Box>
          )}
          {!verificationData.mobileVerified && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Chip
                label="UNVERIFIED"
                sx={{ 
                  backgroundColor: '#ff9800',
                  color: 'white',
                  fontWeight: 'bold' 
                }}
                size="small"
              />
              <Typography variant="body2" color="text.secondary">
                Phone: {verificationData.mobile ?? 'Not provided'}
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
          <Button
            variant="contained"
            size="medium"
            onClick={handleGoToSettings}
            sx={{
              backgroundColor: '#ff9800',
              color: 'white',
              fontWeight: 'bold',
              px: 3,
              '&:hover': {
                backgroundColor: '#f57c00',
              },
            }}
          >
            Complete Verification Now
          </Button>

          <Button
            variant="outlined"
            size="medium"
            onClick={() => window.open('/admin/settings', '_blank')}
            sx={{
              borderColor: '#ff9800',
              color: '#ff9800',
              fontWeight: 'bold',
              px: 3,
              '&:hover': {
                borderColor: '#f57c00',
                backgroundColor: '#fff8e1',
              },
            }}
          >
            Open Settings in New Tab
          </Button>
        </Box>
      </Alert>
    </Box>
  );
}

