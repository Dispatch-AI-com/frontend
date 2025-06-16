import { Box } from '@mui/material';

import Sidebar from '@/components/layout/dashboard-layout/Sidebar';

export default function OverviewPage() {
  return (
    <Box display="flex">
      <Sidebar />
      {/* Main content area can be added here */}
      <Box flex={1} p={3}>
        {/* Add your dashboard content here */}
      </Box>
    </Box>
  );
}
