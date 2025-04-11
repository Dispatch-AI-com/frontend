'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import SignUp from '@/components/features/auth/signUp/SignUp';

export default function Home() {
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <SignUp />
      </Box>
    </Container>
  );
}
