'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import SuccessModal from '@/app/(public)/forgot-password/components/SuccessModal';
import FormField from '@/app/(public)/login/component/FormField';
import Button from '@/app/(public)/login/ui/Button';
import ControllerInput from '@/app/(public)/login/ui/controller/ControllerInput';

import { resetPasswordSchema } from './schemas/resetPasswordSchema';

const PageContainer = styled.div`
  min-height: 100vh;
  background-color: #fafafa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const FormContainer = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
  padding: 40px;
  padding-bottom: 100px;
  border-radius: 24px;
  box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.03);
  background-color: white;

  @media (max-width: 600px) {
    padding: 20px;
    padding-bottom: 60px;
  }
`;

const TopRightWrapper = styled.div`
  position: absolute;
  top: 56px;
  right: 80px;
  z-index: 10;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 6px;
  background: #fafafa;
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  font-size: 14px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    margin-bottom: 24px;
  }
`;

const LogoImageWrapper = styled.div`
  width: 200px;
  height: 100px;

  @media (max-width: 600px) {
    margin-top: 32px;
    width: 105px;
    height: 25px;
  }

  img {
    width: 100% !important;
    height: 100% !important;
    object-fit: contain;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;
`;

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

export default function ResetPasswordPage() {
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

  const onSubmit = (data: { password: string; confirmPassword: string }) => {
    // TODO: handle reset password logic (API call)
    setShowSuccess(true);
  };

  if (!mounted) return null;

  return (
    <PageContainer>
      {showSuccess && (
        <SuccessModal
          title="Reset successfully!"
          description="Password has been successfully updated, please use the new password to log in."
          onClose={() => router.push('/login')}
        />
      )}
      <TopRightWrapper>
        <BackButton onClick={() => router.back()}>
          <svg width="16" height="16" viewBox="0 0 16 16">
            <g fill="none" fillRule="evenodd">
              <path d="M0 0h16v16H0z" />
              <path
                d="M6.424 3.576a.6.6 0 0 1 0 .848L3.448 7.4H14a.6.6 0 0 1 0 1.2H3.448l2.976 2.976a.6.6 0 0 1 .07.765l-.07.083a.6.6 0 0 1-.848 0l-4-4-.06-.07a.602.602 0 0 1-.006-.008l.066.078A.602.602 0 0 1 1.4 8v-.027l.004-.042L1.4 8a.602.602 0 0 1 .176-.424l4-4a.6.6 0 0 1 .848 0z"
                fill="#5A5A5A"
                fillRule="nonzero"
              />
            </g>
          </svg>
          Back
        </BackButton>
      </TopRightWrapper>
      <FormContainer>
        <LogoContainer>
          <LogoImageWrapper>
            <Image src="/logo.svg" alt="Logo" width={200} height={100} />
          </LogoImageWrapper>
        </LogoContainer>
        <Title>Reset Your Password</Title>
        <form onSubmit={e => void handleSubmit(onSubmit)(e)} noValidate>
          <FormField label="New Password" mb={0}>
            <div
              style={{
                position: 'relative',
              }}
            >
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
      </FormContainer>
    </PageContainer>
  );
}
