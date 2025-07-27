'use client';

import { Box, Typography } from '@mui/material';
import React from 'react';

import RecentService from './components/RecentService';

const styles = {
  mainContent: {
    margin: 0,
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '20px',
  },
  titleBar: {
    height: '70px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 24px',
    borderBottom: '1px solid #eaeaea',
  },
  titleText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#060606',
    lineHeight: 1.22,
  },
  contentContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    padding: '24px 24px 24px 24px',
    borderRadius: '20px',
    justifyContent: 'flex-end',
  },
  sectionTitle: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: '16px',
    fontWeight: '600',
    color: '#060606',
    marginBottom: '16px',
  },
};

export default function OverviewPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100vh',
        background: 'linear-gradient(to bottom, #effbf5, #fff 100%)',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          width: { xs: 0, sm: '80px', md: '240px' },
          flexShrink: 0,
          transition: 'width 0.2s',
        }}
      />
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 'calc(100vh - 16px)',
          overflow: 'auto',
          margin: '8px 8px 8px 0',
        }}
      >
        <Box sx={styles.mainContent}>
          <Box sx={styles.titleBar}>
            <Typography sx={styles.titleText}>Overview</Typography>
          </Box>
          <Box sx={styles.contentContainer}>
            <Typography sx={styles.sectionTitle}>Recent Service</Typography>
            <RecentService />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
