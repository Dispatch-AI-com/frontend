'use client';
import { Box,Container } from '@mui/material';

import SignUpForm from '@/components/features/SignUpForm';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <SignUpForm />
      </Box>
    </Container>
  );
}
