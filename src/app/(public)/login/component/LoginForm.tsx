'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { defaultLoginValues } from '@/app/(public)/login/schemas/defaultLoginValues';
import {
  type LoginFormData,
  loginSchema,
} from '@/app/(public)/login/schemas/loginSchema';
import Button from '@/app/(public)/login/ui/Button';
import ControllerInput from '@/app/(public)/login/ui/controller/ControllerInput';
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
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get('redirect') ?? '/dashboard';
  const token = useAppSelector(s => s.auth.token);
  const router = useRouter();
  const hasRedirected = useRef(false);

  useEffect(() => {
    if (token && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace(redirectUrl);
    }
  }, [token, router, redirectUrl]);

  const onSubmit = async (data: LoginFormData) => {
    await loginUser({ email: data.workEmail, password: data.password });
  };

  return (
    <form onSubmit={e => void handleSubmit(onSubmit)(e)} noValidate>
      <WelcomeText>Welcome to Dispatch AI!</WelcomeText>
      <FormField label="Email address">
        <ControllerInput
          name="workEmail"
          control={control}
          placeholder="Email address"
          disabled={isLoading}
        />
      </FormField>
      <FormField label="Password">
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
    </form>
  );
}
