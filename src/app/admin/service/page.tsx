'use client';

import { Box } from '@mui/material';

import ServiceManager from '@/app/admin/service/components/TaskManager/ServiceManager';

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

export default function ServicePage() {
  return (
    <Box sx={styles.pageContainer}>
      <Box sx={styles.mainContent}>
        <ServiceManager />
      </Box>
    </Box>
  );
}
