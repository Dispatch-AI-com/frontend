'use client';

import { Box } from '@mui/material';
import React from 'react';

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        background: 'linear-gradient(to bottom, #effbf5, #ffffff 50%)',
      }}
    >
      {children}
    </Box>
  );
}
