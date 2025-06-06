'use client';
import { Box } from '@mui/material';

import LabelValue from '@/app/dashboard/settings/components/LabelValue';
import SectionDivider from '@/app/dashboard/settings/components/SectionDivider';
import SectionHeader from '@/app/dashboard/settings/components/SectionHeader';

export default function BankAccountSection() {
  return (
    <>
      <SectionDivider />
      <SectionHeader
        title="Bank Account"
        onEdit={() => {
          alert('Edit clicked!');
        }}
      />
      <Box display="flex" flexWrap="wrap" gap={4} mt={2}>
        <Box flex={1}>
          <LabelValue label="Account name:" value="Jone Smith" />
          <LabelValue label="Account number:" value="1234 1234 1234 1234" />
        </Box>
        <Box flex={1}>
          <LabelValue label="BSB:" value="123456" />
        </Box>
      </Box>
    </>
  );
}
