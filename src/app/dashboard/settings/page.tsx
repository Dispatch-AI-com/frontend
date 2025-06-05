'use client';
import { Box, styled } from '@mui/material';

import SectionDivider from '@/app/dashboard/settings/components/SectionDivider';

import SettingsSection from './SettingsSection';

const SettingsHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  padding: theme.spacing(4, 8, 0, 8),
  minHeight: theme.spacing(10),
}));

export default function SettingsPage() {
  return (
    <Box display="flex" bgcolor="#e6f6d9" minHeight="100vh" p={3}>
      <Box
        width={220}
        p={3}
        bgcolor="#e6f6d9"
        borderRight="1px solid #e6f6d9"
        minHeight="100vh"
      >
        <h2>Sidebar</h2>
      </Box>
      <Box
        sx={{
          borderRadius: 2,
          bgcolor: '#fff',
          flex: 1,
          minHeight: 'calc(100vh - 48px)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <SettingsHeader>
          <Box
            component="h2"
            sx={{
              margin: 0,
              flex: 1,
            }}
          >
            Settings
          </Box>
        </SettingsHeader>
        <SectionDivider my={1} />
        <Box pt={3} pb={3} pl={60} pr={60}>
          <SettingsSection />
        </Box>
      </Box>
    </Box>
  );
}
