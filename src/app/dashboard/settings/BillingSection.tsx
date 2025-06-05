'use client';
import { Box } from '@mui/material';

import LabelValue from '@/app/dashboard/settings/components/LabelValue';
import SectionDivider from '@/app/dashboard/settings/components/SectionDivider';
import SectionHeader from '@/app/dashboard/settings/components/SectionHeader';

export default function BillingSection() {
  return (
    <>
      <SectionDivider />
      <SectionHeader
        title="Billing"
        onEdit={() => {
          alert('Edit clicked!');
        }}
      />
      <Box display="flex" flexWrap="wrap" gap={4} mt={2}>
        <Box flex={1}>
          <LabelValue
            label="Credit card & Billing address:"
            value="Credit card & Billing address Credit card & Billing address Credit card & Billing address Credit card & Billing address"
          />
        </Box>
      </Box>
    </>
  );
}
