'use client';

import { Box, Container, Typography } from '@mui/material';
import SignupButton from '@/components/ui/signup/button/SignupButton';
import CallUpLine from '@/components/ui/signup/call-up/CallUpLine';
import SignUpForm from '@/components/ui/signup/form/SignUpForm';
import { useSignup } from '@/hooks/signup/useSignup';

export default function Signup() {

  const { formData, handleChange, handleSubmit, error, success } = useSignup();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 4 }}>
        <CallUpLine />
        <SignUpForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
        <SignupButton />

        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {success && (
          <Typography color="success.main" sx={{ mt: 2 }}>
            {success}
          </Typography>
        )}
      </Box>
    </Container>
  );
}