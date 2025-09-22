'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';

import { AdminPageLayout } from '@/components/layout/admin-layout';
import { useAppSelector } from '@/redux/hooks';
import { useSubscription } from '@/features/subscription/useSubscription';
import { getPlanTier, isFreeOrBasicPlan } from '@/utils/planUtils';

import ActivitySection from './components/ActivitySection';
import CampaignProgressSection from './components/CompaignProgressSection';
import RecentService from './components/RecentService';
import VerificationReminder from './components/VerificationReminder';

const styles = {
  contentContainer: {
    display: 'flex',
    padding: '24px 24px 0 24px',
    borderRadius: '20px',
    overflowX: 'visible',
    width: '100%',
    '@media (max-width: 450px)': {
      padding: '12px 12px 0 12px',
    },
  },

  sectionTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#060606',
    lineHeight: 1.25,
    padding: '24px 24px 16px 24px',
  },
};

export default function OverviewPage() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const user = useAppSelector(state => state.auth.user);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-assignment
  const { subscription } = useSubscription();

  // Check if user has FREE or BASIC plan
  const planTier = getPlanTier(subscription);
  const shouldHideBookingFeatures = isFreeOrBasicPlan(planTier);

  return (
    <AdminPageLayout title="Overview" padding="normal" background="solid">
      {/* Verification Reminder */}
      {user?._id && <VerificationReminder userId={user._id} />}

      <Box sx={styles.contentContainer}>
        <ActivitySection />
      </Box>

      <Typography sx={styles.sectionTitle}>Compaign Progress</Typography>
      <Box sx={{ ...styles.contentContainer, paddingTop: 0 }}>
        <CampaignProgressSection />
      </Box>

      {!shouldHideBookingFeatures && (
        <>
          <Typography sx={styles.sectionTitle}>Recent Bookings</Typography>
          <Box sx={{ ...styles.contentContainer, paddingTop: 0 }}>
            <RecentService />
          </Box>
        </>
      )}
    </AdminPageLayout>
  );
}
