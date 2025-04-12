'use client';

import SignupForm from '@/app/signup/components/SignupForm';
import { Box, useTheme } from '@mui/material';
import Image from 'next/image';

export default function SignupPage() {
  const theme = useTheme();

  const logoSrc = theme.palette.mode === 'dark' 
    ? '/logo-light.svg' 
    : '/logo-dark.svg'; 

  return (
    <Box maxWidth="700px" minHeight="1318px" mx="auto" mt={8} px={10} py={2}>
      <Box display="flex" justifyContent="center" mb={4}>
        <Image src={logoSrc} alt="Logo" width={200} height={100} priority />
      </Box>
      <SignupForm />
    </Box>
  );
}
