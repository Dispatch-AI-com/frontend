'use client';
import { Box } from '@mui/material';

import LabelValue from '@/app/dashboard/settings/components/LabelValue';
import SectionDivider from '@/app/dashboard/settings/components/SectionDivider';
import SectionHeader from '@/app/dashboard/settings/components/SectionHeader';

export default function BillingAddressSection() {
  return (
    <>
      <SectionDivider />
      <SectionHeader
        title="Billing Address"
        onEdit={() => {
          alert('Edit clicked!');
        }}
      />
      <Box display="flex" flexWrap="wrap" gap={4} mt={2}>
        <Box flex={1}>
          <LabelValue
            label="Unit/Apt/PO BoX:"
            value="Enter unit, apartment, or PO Box"
          />
          <LabelValue label="Suburb:" value="New South WalesSydney" />
          <LabelValue label="Postcode:" value="2140" />
        </Box>
        <Box flex={1}>
          <LabelValue
            label="Street address:"
            value="3-5 Underwood Road,Sydney"
          />
          <LabelValue label="State:" value="State" />
        </Box>
      </Box>
    </>
  );
}
