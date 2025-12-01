'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import FormField from '@/app/(public)/login/component/FormField';
import Button from '@/app/(public)/login/ui/Button';
import ControllerInput from '@/app/(public)/login/ui/controller/ControllerInput';

import SuccessModal from './components/SuccessModal';
import { forgotPasswordSchema } from './schemas/forgotPasswordSchema';

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

const IconWrapper = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  z-index: 2;
  display: none;

  @media (max-width: 600px) {
    display: block;
  }
`;

const RelativeContainer = styled.div`
  position: relative;
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

const Subtitle = styled.p`
  text-align: center;
  color: #444;
  font-size: 16px;
  margin-bottom: 50px;
  margin-top: -12px;
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

export default function ForgotPasswordPage() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);
  const [sentEmail, setSentEmail] = useState('');
  const { control, handleSubmit } = useForm<{ email: string }>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (data: { email: string }) => {
    try {
      const res = await fetch(
        'http://localhost:4000/api/auth/forgot-password',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: data.email }),
        },
      );

      // Optionally handle error response
      if (!res.ok) {
        const result = (await res.json()) as { message?: string };
        alert(result.message ?? 'Failed to send reset email');
        return;
      }

      setSentEmail(data.email);
      setShowSuccess(true);
    } catch {
      alert('Network error. Please try again.');
    }
  };

  if (!mounted) {
    return (
      <div
        style={{
          minHeight: '100vh',
          backgroundColor: '#fafafa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          visibility: 'hidden',
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <PageContainer>
      {showSuccess && (
        <SuccessModal
          title="Email sent successfully!"
          description={
            <>
              An email has been sent to{' '}
              <span style={{ color: '#0687ff' }}>{sentEmail}</span> with
              instructions for resetting your password. This email may take a
              few minutes to arrive in your inbox.
            </>
          }
          onClose={() => setShowSuccess(false)}
        />
      )}
      <TopRightWrapper>
        <BackButton onClick={() => router.back()}>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
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
      <FormContainer as={RelativeContainer}>
        <IconWrapper>
          <button
            type="button"
            onClick={() => router.back()}
            style={{
              background: 'none',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
            aria-label="Go back"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g fill="none" fillRule="evenodd">
                <path d="M0 0h20v20H0z" />
                <path
                  d="M12.47 3.47a.75.75 0 0 1 1.06 1.06L8.061 10l5.47 5.47a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-1.06 0l-6-6a.75.75 0 0 1 0-1.06l6-6z"
                  fill="#060606"
                  fillRule="nonzero"
                />
              </g>
            </svg>
          </button>
        </IconWrapper>
        <LogoContainer>
          <LogoImageWrapper>
            <Image src="/logo.svg" alt="Logo" width={200} height={100} />
          </LogoImageWrapper>
        </LogoContainer>
        <Title>Forgot Password</Title>
        <Subtitle>
          Fill in your email and we'll send you a link to reset your password.
        </Subtitle>
        <form onSubmit={e => void handleSubmit(onSubmit)(e)} noValidate>
          <FormField label="Email address" mb={0}>
            <ControllerInput
              name="email"
              control={control}
              placeholder="Email address"
            />
          </FormField>
          <Button type="submit" fullWidth sx={{ mt: 2 }}>
            Send
          </Button>
        </form>
      </FormContainer>
    </PageContainer>
  );
}
