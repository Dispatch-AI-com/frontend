import { Box } from '@mui/material';

import SettingsSection from './SettingsSection';

export default function SettingsPage() {
  return (
    <Box display="flex">
      <Box
        width={220}
        p={3}
        bgcolor="#f5f5f5"
        borderRight="1px solid #ddd"
        minHeight="100vh"
      >
        <h2>Sidebar</h2>
      </Box>
      <Box
        flex={1}
        pt={3} // padding-top: 24px
        pb={3} // padding-bottom: 24px
        pl={60} // padding-left: 320px
        pr={60} // padding-right: 320px
      >
        <SettingsSection />
      </Box>
    </Box>
  );
}
