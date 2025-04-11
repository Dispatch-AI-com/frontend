'use client';

import Image from 'next/image';
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Alert,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log('Logging in with', form);

    try {
      const res = await fetch('http://localhost:3000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok && data.access_token) {
        localStorage.setItem('token', data.access_token);
        setSuccess(true);
        setTimeout(() => router.push('/dashboard'), 1000);
      } else {
        setError(data.message || 'Invalid credentials');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to connect to server');
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: '#FAFAFA' }}
    >
      <Box
        maxWidth={420}
        width="100%"
        p={4}
        borderRadius={3}
        boxShadow={2}
        bgcolor="#fff"
      >
        <Box display="flex" justifyContent="center" mb={2}>
          <Image src="/logo.svg" alt="DispatchAI" width={120} height={30} />
        </Box>
        <Typography variant="h6" fontWeight="bold" align="center" mb={1} color="black">
          Welcome to Dispatch AI!
        </Typography>

        <form onSubmit={handleSubmit}>
          <Button
            fullWidth
            variant="outlined"
            startIcon={
              <Image
                src="/google.svg"
                alt="Google icon"
                width={20}
                height={20}
              />
            }
            sx={{ mb: 2, textTransform: 'none', color: 'black', borderColor: '#E0E0E0' }}
          >
            Sign in with Google
          </Button>
          <Divider sx={{ my: 2 }}>OR</Divider>

          <Typography variant="subtitle2" fontWeight={600} mb={1} color="black">
            Email address
          </Typography>
          <TextField
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Email address"
            variant="outlined"
            fullWidth
            margin="dense"
          />

          <Typography variant="subtitle2" fontWeight={600} mt={2} mb={1} color="black">
            Password
          </Typography>
          <TextField
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            variant="outlined"
            fullWidth
            margin="dense"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}
          {success && (
            <Alert severity="success" sx={{ mt: 2 }}>
              Login successful!
            </Alert>
          )}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, bgcolor: 'black', color: 'white', textTransform: 'none' }}
          >
            Sign in with email
          </Button>
        </form>

        <Typography align="center" mt={2} fontSize={14} color="black">
          <Link href="#" style={{ color: 'black', fontWeight: 500 }}>
            Use Single Sign-On
          </Link>
        </Typography>

        <Box display="flex" justifyContent="center" gap={1} mt={4}>
          <Link href="#" style={{ color: 'black', fontSize: 12 }}>
            Terms of Service
          </Link>
          <Typography variant="body2" color="black" fontSize={12}>
            &
          </Typography>
          <Link href="#" style={{ color: 'black', fontSize: 12 }}>
            Privacy Policy
          </Link>
        </Box>
      </Box>
    </Box>
  );
}