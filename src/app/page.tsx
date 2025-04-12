'use client';

import { Box, Typography, Button, Container } from '@mui/material';
import { useRouter } from 'next/navigation';


export default function Home() {
  const router = useRouter()
  const handleSignUp = () => {
    router.push('/signup')
  }
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4, textAlign: 'center' }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Next.js + MUI Setup Test
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Your MUI components are working correctly if you see styled elements
        </Typography>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center', gap: 2 }}>
          <Button variant="contained" color="primary">
            Primary Button
          </Button>
          <Button variant="contained" color="secondary">
            Secondary Button
          </Button>
          <Button variant="outlined">Outlined Button</Button>
          <Button variant="contained" color="primary" onClick={handleSignUp}>
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
