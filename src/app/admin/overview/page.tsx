'use client';

import { Box, Typography, useMediaQuery } from '@mui/material';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const styles = {
  pageContainer: {
    display: 'flex',
    background: 'linear-gradient(to bottom, #effbf5, #fff 100%)',
    boxSizing: 'border-box',
    margin: '0 0 0 240px',
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
};

export default function OverviewPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const status = searchParams.get('status'); // 'success' | 'failed' | null
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (status === 'success' || status === 'failed') {
      setShowModal(true);
    }
  }, [status]);

  const handleCloseModal = () => {
    setShowModal(false);
    const newUrl = window.location.pathname;
    router.replace(newUrl);
  };

  return (
    <>
      <Box sx={styles.pageContainer}>
        <Box sx={styles.mainContent}>
          <Box sx={styles.titleBar}>
            <Typography sx={styles.titleText}>Billing</Typography>
          </Box>
          <Box sx={styles.contentContainer}></Box>

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              padding: '0 24px',
            }}
          >
            <Typography sx={styles.titleText}>Invoice History</Typography>
          </Box>
          <Box sx={styles.contentContainer}></Box>
        </Box>
      </Box>
    </>
  );
}
