'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';

import { AdminPageLayout } from '@/components/layout/admin-layout';

import ActivitySection from './components/ActivitySection';
import CampaignProgressSection from './components/CompaignProgressSection';
import RecentService from './components/RecentService';

const styles = {
  contentContainer: {
    display: 'flex',
    padding: '24px 24px 0 24px',
    borderRadius: '20px',
    overflowX: 'visible',
    maxWidth: '1220px',
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
  return (
    <AdminPageLayout title="Overview" padding="normal" background="solid">
      <Box sx={styles.contentContainer}>
        <ActivitySection />
      </Box>

      <Typography sx={styles.sectionTitle}>Compaign Progress</Typography>
      <Box sx={{ ...styles.contentContainer, paddingTop: 0 }}>
        <CampaignProgressSection />
      </Box>

      <Typography sx={styles.sectionTitle}>Recent Services</Typography>
      <Box sx={{ ...styles.contentContainer, paddingTop: 0 }}>
        <RecentService />
      </Box>
    </AdminPageLayout>
  );
}
