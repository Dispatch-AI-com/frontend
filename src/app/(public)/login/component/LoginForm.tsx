'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { defaultLoginValues } from '@/app/(public)/login/schemas/defaultLoginValues';
import {
  type LoginFormData,
  loginSchema,
} from '@/app/(public)/login/schemas/loginSchema';
import Button from '@/app/(public)/login/ui/Button';
import ControllerInput from '@/app/(public)/login/ui/controller/ControllerInput';
import GoogleOAuthButton from '@/components/GoogleOAuthButton';
import { useLoginUserMutation } from '@/features/auth/authApi';
import { useAppSelector } from '@/redux/hooks';
import { parseRTKError } from '@/utils/parseRTKError';

import FormField from './FormField';

const WelcomeText = styled.h1`
  text-align: center;
  font-size: 24px;
  font-weight: 600;
  color: #1a1a1a;
  margin-bottom: 32px;

  @media (max-width: 600px) {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 64px;
  }
`;

const PolicyLinks = styled.div`
  text-align: center;
  margin-top: 32px;

  a {
    text-decoration: underline;
    color: #1a1a1a;
    font-weight: 500;
    margin: 0 8px;
  }
`;

const SsoLinkWrapper = styled(PolicyLinks)`
  font-weight: 700 !important;

  @media (max-width: 600px) {
    margin-bottom: 100px;
  }
`;

const ErrorMessage = styled.div`
  color: #dc2626;
  font-size: 14px;
  margin-top: 8px;
  text-align: center;
  margin-bottom: 16px;
`;

export default function LoginForm() {
  const { control, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues,
    mode: 'onSubmit',
  });

  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const token = useAppSelector(s => s.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (token) {
      router.replace('/admin/overview');
    }
  }, [token, router]);

  const onSubmit = async (data: LoginFormData) => {
    await loginUser({ email: data.workEmail, password: data.password });
  };

  return (
    <form onSubmit={e => void handleSubmit(onSubmit)(e)} noValidate>
      <WelcomeText>Welcome to Dispatch AI!</WelcomeText>
      <GoogleOAuthButton disabled={isLoading} />
      <FormField label="Email address" mb={0}>
        <ControllerInput
          name="workEmail"
          control={control}
          placeholder="Email address"
          disabled={isLoading}
        />
      </FormField>
      <FormField label="Password" mb={0}>
        <ControllerInput
          name="password"
          control={control}
          placeholder="Password"
          type="password"
          disabled={isLoading}
        />
      </FormField>

      {error && <ErrorMessage>{parseRTKError(error)}</ErrorMessage>}

      <Button type="submit" fullWidth sx={{ mt: 2 }} disabled={isLoading}>
        {isLoading ? 'Logging in…' : 'Log In'}
      </Button>

      <SsoLinkWrapper>
        <a href="/sso" target="_blank" rel="noopener noreferrer">
          Use Single Sign-On
        </a>
      </SsoLinkWrapper>
      <PolicyLinks>
        <a href="/terms" target="_blank" rel="noopener noreferrer">
          Terms of Service
        </a>
        &nbsp; &amp; &nbsp;
        <a href="/privacy" target="_blank" rel="noopener noreferrer">
          Privacy Policy
        </a>
      </PolicyLinks>
    </form>
  );
}
