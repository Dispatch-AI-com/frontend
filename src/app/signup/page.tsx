'use client';

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    agree: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, agree: e.target.checked });
  };

  const validate = () => {
    const newErrors: typeof errors = {};
    if (!form.firstName) newErrors.firstName = 'First name is required';
    if (!form.lastName) newErrors.lastName = 'Last name is required';
    if (!form.email) newErrors.email = 'Email is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (!form.agree) newErrors.agree = 'You must agree to the terms';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    sessionStorage.setItem('firstName', form.firstName);
    sessionStorage.setItem('lastName', form.lastName);
    sessionStorage.setItem('email', form.email);
    sessionStorage.setItem('password', form.password);

    router.push('/signup/extra');
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      sx={{ backgroundColor: '#f9f9f9' }}
    >
      <Box
        maxWidth={480}
        width="100%"
        bgcolor="#fff"
        p={5}
        borderRadius={3}
        boxShadow={3}
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <Image src="/logo.svg" alt="logo" width={120} height={40} />
        </Box>

        <Typography variant="h6" align="center" fontWeight="bold" gutterBottom color="black">
          Get Started With Smart Agent!
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary" fontSize="0.875rem">
          Enter your credentials to access your account
        </Typography>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Image src="/google.svg" alt="Google icon" width={20} height={20} />}
          sx={{ mb: 2, textTransform: 'none', fontWeight: 'bold', color: 'black', borderColor: '#E0E0E0' }}
        >
          Sign up with Google
        </Button>

        <Divider sx={{ my: 2 }}>OR</Divider>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="First Name"
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                error={!!errors.lastName}
                helperText={errors.lastName}
              />
            </Grid>
          </Grid>

          <TextField
            fullWidth
            label="Email address"
            name="email"
            value={form.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mt: 2 }}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
            sx={{ mt: 2 }}
          />

          <FormControlLabel
            control={<Checkbox checked={form.agree} onChange={handleCheckbox} />}
            label={
              <Typography color="black" fontSize="0.875rem">
                I agree to the <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
              </Typography>
            }
            sx={{ mt: 1 }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 2, backgroundColor: 'black', color: 'white' }}
          >
            Sign Up
          </Button>
        </form>

        <Typography variant="body2" align="center" mt={2}>
          Already have an account?{' '}
          <a href="/login" style={{ color: 'black', fontWeight: 'bold' }}>Sign in</a>
        </Typography>
      </Box>
    </Box>
  );
}
