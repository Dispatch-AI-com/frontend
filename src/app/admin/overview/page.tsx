'use client';

import { Box, Typography } from '@mui/material';
import { max } from 'lodash';
import React from 'react';

import ActivitySection from './components/ActivitySection';
import RecentService from './components/RecentService';

const styles = {
  pageContainer: {
    display: 'flex',
    background: 'linear-gradient(to bottom, #effbf5, #fff 100%)',
    boxSizing: 'border-box',
    marginLeft: { xs: 0, sm: '50px', md: '240px' },
  },

  mainContent: {
    margin: '8px 8px 8px 8px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    borderRadius: '20px',
  },

  contentContainer: {
    flex: 1,
    display: 'flex',
    padding: '24px 24px 0 24px',
    borderRadius: '20px',
    overflowX: 'visible',
    maxWidth: '1220px',
  },

  titleBar: {
    height: '70px',
    display: 'flex',
    alignItems: 'center',
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

  SubTitleBar: {
    display: 'flex',
    alignItems: 'center',
    padding: '24px 0 16px 24px',
  },

  SubTitleText: {
    fontFamily: 'Roboto, sans-serif',
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 1.25,
    color: '#060606',
  },
};

export default function OverviewPage() {
  return (
    <>
      <Box sx={styles.pageContainer}>
        <Box sx={styles.mainContent}>
          <Box sx={styles.titleBar}>
            <Typography sx={styles.titleText}>Overview</Typography>
          </Box>

          <Box sx={styles.contentContainer}>
            <ActivitySection />
          </Box>

          <Box sx={styles.SubTitleBar}>
            <Typography sx={styles.SubTitleText}>Recent Services</Typography>
          </Box>
          <Box sx={styles.contentContainer} style={{ padding: '0 24px' }}>
            <RecentService />
          </Box>
        </Box>
      </Box>
    </>
  );
}
