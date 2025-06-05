'use client';
import { Box } from '@mui/material';

import LabelValue from '@/app/dashboard/settings/components/LabelValue';
import SectionDivider from '@/app/dashboard/settings/components/SectionDivider';
import SectionHeader from '@/app/dashboard/settings/components/SectionHeader';

export default function UserProfileSection() {
  return (
    <>
      <SectionDivider />
      <SectionHeader
        title="User Profile"
        onEdit={() => {
          alert('Edit clicked!');
        }}
      />
      <Box display="flex" flexWrap="wrap" gap={4} mt={2}>
        <Box flex={1}>
          <LabelValue label="Name:" value="Jeon Chen" />
          <LabelValue label="Role:" value="Development" />
        </Box>
        <Box flex={1}>
          <LabelValue label="Company:" value="Google" />
          <LabelValue label="Contact:" value="+61 481256866" />
        </Box>
      </Box>
    </>
  );
}
