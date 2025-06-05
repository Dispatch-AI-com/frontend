'use client';
import { Box } from '@mui/material';

import LabelValue from '@/app/dashboard/settings/components/LabelValue';
import SectionDivider from '@/app/dashboard/settings/components/SectionDivider';
import SectionHeader from '@/app/dashboard/settings/components/SectionHeader';

export default function NotificationsSection() {
  return (
    <>
      <SectionDivider />
      <SectionHeader
        title="Notifications"
        onEdit={() => {
          alert('Edit clicked!');
        }}
      />
      <Box display="flex" flexWrap="wrap" gap={4} mt={2}>
        <Box flex={1}>
          <LabelValue label="Email address:" value="email51@company.com" />
        </Box>
      </Box>
    </>
  );
}
