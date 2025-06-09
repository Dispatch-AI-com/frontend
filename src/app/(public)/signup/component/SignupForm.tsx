'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import { useSignupUserMutation } from '@/features/auth/authApi';
import { useAppSelector } from '@/redux/hooks';
import { parseRTKError } from '@/utils/parseRTKError';

import { defaultSignupValues } from '../schemas/defaultSignupValues';
import { type SignupFormData, signupSchema } from '../schemas/signupSchema';
import Button from '../ui/Button';
import ControllerCheckbox from '../ui/controller/ControllerCheckbox';
import ControllerInput from '../ui/controller/ControllerInput';
import FormField from './FormField';

const Title = styled.h1`…`;
const ErrorMessage = styled.div`…`;

export default function SignupForm() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectTo = params.get('redirect') ?? '/dashboard';
  const token = useAppSelector(s => s.auth.token);
  const hasRedirected = useRef(false);

  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const { control, handleSubmit } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultSignupValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (token && !hasRedirected.current) {
      hasRedirected.current = true;
      router.replace(redirectTo);
    }
  }, [token, redirectTo, router]);

  const onSubmit = async (vals: SignupFormData) => {
    const payload = {
      name: `${vals.firstName} ${vals.lastName}`,
      email: vals.workEmail,
      password: vals.password,
    };

    await signupUser(payload);
  };

  return (
    <form onSubmit={e => void handleSubmit(onSubmit)(e)} noValidate>
      <Title>Create your account</Title>

      {error && <ErrorMessage>{parseRTKError(error)}</ErrorMessage>}

      <FormField label="First Name">
        <ControllerInput
          name="firstName"
          control={control}
          placeholder="First Name"
          disabled={isLoading}
        />
      </FormField>

      <FormField label="Last Name">
        <ControllerInput
          name="lastName"
          control={control}
          placeholder="Last Name"
          disabled={isLoading}
        />
      </FormField>

      <FormField label="Work Email Address">
        <ControllerInput
          name="workEmail"
          control={control}
          type="email"
          placeholder="you@company.com"
          disabled={isLoading}
        />
      </FormField>

      <FormField label="Password">
        <ControllerInput
          name="password"
          control={control}
          type="password"
          placeholder="Password"
          disabled={isLoading}
        />
      </FormField>

      <FormField>
        <ControllerCheckbox
          name="agreeToPolicy"
          control={control}
          label="I agree to the Terms of Service and Privacy Policy."
          disabled={isLoading}
        />
      </FormField>

      <FormField>
        <ControllerCheckbox
          name="agreeToComms"
          control={control}
          label="Receive marketing communications (optional)"
          disabled={isLoading}
        />
      </FormField>

      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? 'Creating Account…' : 'Sign Up'}
      </Button>
    </form>
  );
}
