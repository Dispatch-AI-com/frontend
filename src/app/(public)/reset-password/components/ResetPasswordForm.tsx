'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

import SuccessModal from '@/app/(public)/forgot-password/components/SuccessModal';
import FormField from '@/app/(public)/login/component/FormField';
import Button from '@/app/(public)/login/ui/Button';
import ControllerInput from '@/app/(public)/login/ui/controller/ControllerInput';

import { resetPasswordSchema } from '../schemas/resetPasswordSchema';

const EyeIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h16v16H0z" />
      <path
        d="M14.859 4.66a.5.5 0 0 1 .212.674c-.264.508-.66.977-1.166 1.392a6.072 6.072 0 0 1-.358.272l1.807 1.807a.5.5 0 0 1-.638.765l-.07-.057-1.986-1.987a9.35 9.35 0 0 1-2.244.774l.661 2.467a.5.5 0 0 1-.935.343l-.03-.084-.688-2.561a11.879 11.879 0 0 1-2.862-.001l-.686 2.562a.5.5 0 0 1-.981-.17l.015-.089.66-2.47a9.347 9.347 0 0 1-2.231-.77L1.354 9.512a.5.5 0 0 1-.765-.637l.057-.07L2.451 7a6.073 6.073 0 0 1-.36-.273c-.506-.415-.902-.884-1.166-1.392a.5.5 0 1 1 .887-.461c.199.381.507.747.913 1.08 1.208.99 3.15 1.597 5.273 1.597 2.122 0 4.066-.607 5.273-1.597.406-.333.715-.699.913-1.08a.5.5 0 0 1 .675-.213z"
        fill="#BBB"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

const EyeOffIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g fill="none" fillRule="evenodd">
      <path d="M0 0h16v16H0z" />
      <path
        d="M8 2.056c3.804 0 7.5 3.165 7.5 5.944s-3.696 5.944-7.5 5.944S.5 10.777.5 8 4.196 2.056 8 2.056zm0 1C4.717 3.056 1.5 5.812 1.5 8s3.217 4.944 6.5 4.944S14.5 10.19 14.5 8c0-2.19-3.217-4.944-6.5-4.944zm0 2.11a2.833 2.833 0 1 1 0 5.667 2.833 2.833 0 0 1 0-5.666zm0 1a1.833 1.833 0 1 0 0 3.667 1.833 1.833 0 0 0 0-3.666z"
        fill="#BBB"
        fillRule="nonzero"
      />
    </g>
  </svg>
);

interface ResetPasswordFormProps {
  token: string;
}

export default function ResetPasswordForm({ token }: ResetPasswordFormProps) {
  const [mounted, setMounted] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();
  const { control, handleSubmit, formState } = useForm<{
    password: string;
    confirmPassword: string;
  }>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: {
    password: string;
    confirmPassword: string;
  }) => {
    try {
      // Call the backend API to reset password (mocked for now)
      const res = await fetch('http://localhost:4000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }),
      });

      if (!res.ok) {
        // Optionally handle error response
        const data = (await res.json()) as unknown;
        let errorMessage: string | undefined;
        if (typeof data === 'object' && data !== null && 'message' in data) {
          const msg = (data as Record<string, unknown>).message;
          if (typeof msg === 'string') errorMessage = msg;
        }
        alert(errorMessage ?? 'Failed to reset password');
        return;
      }

      setShowSuccess(true);
    } catch (err) {
      alert('Network error. Please try again.');
    }
  };

  if (!mounted) return null;

  return (
    <>
      {showSuccess && (
        <SuccessModal
          title="Reset successfully!"
          description="Password has been successfully updated, please use the new password to log in."
          onClose={() => router.push('/login')}
        />
      )}
      <form onSubmit={e => void handleSubmit(onSubmit)(e)} noValidate>
        <FormField label="New Password" mb={0}>
          <div style={{ position: 'relative' }}>
            <ControllerInput
              name="password"
              control={control}
              placeholder="New Password"
              type={showPassword ? 'text' : 'password'}
              hideError
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              style={{
                position: 'absolute',
                right: 15,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {formState.errors.password && (
            <div
              style={{
                color: '#d32f2f',
                fontSize: 12,
                marginTop: 4,
                marginLeft: 4,
              }}
            >
              {formState.errors.password.message}
            </div>
          )}
        </FormField>
        <FormField label="Confirm New Password" mb={0}>
          <div style={{ position: 'relative' }}>
            <ControllerInput
              name="confirmPassword"
              control={control}
              placeholder="Confirm New Password"
              type={showConfirmPassword ? 'text' : 'password'}
              hideError
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(v => !v)}
              style={{
                position: 'absolute',
                right: 15,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
              tabIndex={-1}
              aria-label={
                showConfirmPassword ? 'Hide password' : 'Show password'
              }
            >
              {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
            </button>
          </div>
          {formState.errors.confirmPassword && (
            <div
              style={{
                color: '#d32f2f',
                fontSize: 12,
                marginTop: 4,
                marginLeft: 4,
              }}
            >
              {formState.errors.confirmPassword.message}
            </div>
          )}
        </FormField>
        <Button type="submit" fullWidth sx={{ mt: 2 }}>
          Submit
        </Button>
      </form>
    </>
  );
}
