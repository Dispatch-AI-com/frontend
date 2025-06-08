'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { defaultSignupValues } from '@/app/(public)/signin/schemas/defaultSigninValues';
import {
  type SigninFormData,
  signinSchema,
} from '@/app/(public)/signin/schemas/signinSchema';
import Button from '@/app/(public)/signin/ui/Button';
import ControllerInput from '@/app/(public)/signin/ui/controller/ControllerInput';
import { useLoginUserMutation } from '@/features/auth/authApi';
import { useAppSelector } from '@/redux/hooks';

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

export default function SigninForm() {
  const { control, handleSubmit } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
    defaultValues: defaultSignupValues,
    mode: 'onSubmit',
  });
  const [loginUser, { isLoading, error }] = useLoginUserMutation();

  const token = useAppSelector(s => s.auth.token);
  const router = useRouter();

  useEffect(() => {
    if (token) router.push('/reduxtest');
  }, [token, router]);

  const onSubmit = async (data: SigninFormData) => {
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
        />
      </FormField>
      <FormField label="Password">
        <ControllerInput
          name="password"
          control={control}
          placeholder="Password"
          type="password"
        />
      </FormField>

      {Boolean(error) && <ErrorMessage>Invalid credentials</ErrorMessage>}

      <Button type="submit" fullWidth sx={{ mt: 2 }} disabled={isLoading}>
        {isLoading ? 'Signing in…' : 'Sign In'}
      </Button>
    </form>
  );
}
