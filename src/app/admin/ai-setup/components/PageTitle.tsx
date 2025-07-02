'use client';

import { styled, Typography } from '@mui/material';

const StyledTitle = styled(Typography)(() => ({
  fontFamily: 'Roboto, sans-serif',
  fontSize: '18px',
  fontWeight: 700,
  color: '#060606',
}));

export default function PageTitle() {
  return <StyledTitle>Dispatch AI Setup</StyledTitle>;
}
