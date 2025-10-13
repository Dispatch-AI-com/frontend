'use client';

import { Box, Typography } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

import { AdminPageLayout } from '@/components/layout/admin-layout';
import ProFeatureModal from '@/components/ui/ProFeatureModal';
import { useSubscription } from '@/features/subscription/useSubscription';
import { getPlanTier, isFreeOrBasicPlan, isProPlan } from '@/utils/planUtils';

import ActivitySection from './components/ActivitySection';
import CampaignProgressSection from './components/CompaignProgressSection';
import RecentService from './components/RecentService';

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
  const { subscription } = useSubscription();
  const params = useSearchParams();
  const router = useRouter();

  // Check if user has FREE or BASIC plan
  const planTier = getPlanTier(subscription);
  const shouldHideBookingFeatures = isFreeOrBasicPlan(planTier);
  const isPro = isProPlan(planTier);
  const featurePrompt = params.get('featurePrompt');
  const [open, setOpen] = React.useState<boolean>(false);

  useEffect(() => {
    if (featurePrompt && !isPro) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [featurePrompt, isPro]);

  const handleClose = () => {
    setOpen(false);
    router.replace('/admin/overview');
  };
  const handleUpgrade = () => {
    router.push('/admin/billing');
  };

  return (
    <>
      <AdminPageLayout title="Overview" padding="normal" background="solid">
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
      <ProFeatureModal
        open={open}
        onClose={handleClose}
        onUpgrade={handleUpgrade}
        featureName={featurePrompt ?? undefined}
      />
    </>
  );
}
