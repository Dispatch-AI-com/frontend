'use client';

import { Box } from '@mui/material';

import ServiceManagementContent from './components/ServiceManagementContent';

const styles = {
  pageContainer: {
    display: 'flex',
    background: 'linear-gradient(to bottom, #effbf5, #fff 100%)',
    boxSizing: 'border-box',
    minHeight: '100vh',
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
};

export default function ServiceManagementPage() {
  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.mainContent}>
        <ServiceManagementContent />
      </Box>
    </Box>
  );
}
