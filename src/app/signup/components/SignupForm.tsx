import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Stack, Button, Alert } from '@mui/material';
import { signupSchema, type SignupFormData } from '../schemas/SignupSchema';
import FormField from '@/components/ui/FormField';
import ControllerInput from '@/components/forms/ControllerInput';
import { useState } from 'react';

export default function SignupForm() {
  const [success, setSuccess] = useState(false);
  const [error,   setError]   = useState('');

  const { control, handleSubmit } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: 
    { name: '', 
      email: '', 
      password: '' 
    },
  });

  const onSubmit = async (data: SignupFormData) => {
    setSuccess(false);
    setError('');

    try {
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setSuccess(true);
      } else {
        const msg = await res.text();
        setError(msg || 'Something went wrong');
      }
    } catch {
      setError('Network error. Please try again.');
    } 
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {success && (
        <Alert severity="success" sx={{ mb: 2 }}>
          Registration successful!
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack spacing={2}>
        <FormField label="Name" required>
          <ControllerInput 
          name="name" 
          control={control} 
          placeholder="Enter your name" />
        </FormField>

        <FormField label="Email" required>
          <ControllerInput 
          name="email" 
          control={control} 
          placeholder="Enter your email" />
        </FormField>

        <FormField label="Password" required>
          <ControllerInput
            name="password"
            type="password"
            control={control}
            placeholder="Enter your password"
          />
        </FormField>
      </Stack>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2, borderRadius: '12px' }}
      >
        Sign Up
      </Button>
    </form>
  );
}
