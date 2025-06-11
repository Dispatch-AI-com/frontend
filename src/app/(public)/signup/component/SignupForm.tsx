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

const StyledForm = styled.form`
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 8px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 32px 0 40px 0;
`;

const LoginContainer = styled.div`
  text-align: center;
  margin-top: 24px;
  color: #666;
  font-size: 14px;
`;

const LoginLink = styled.a`
  color: #060606;
  text-decoration: underline;
  cursor: pointer;

  &:hover {
    color: #333;
  }
`;

const ErrorMessage = styled.div`
  color: #f44336;
  font-size: 14px;
  text-align: center;
  margin-bottom: 16px;
  padding: 8px;
  background-color: rgba(244, 67, 54, 0.1);
  border-radius: 6px;
  border: 1px solid #f44336;
`;

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
    <StyledForm onSubmit={e => void handleSubmit(onSubmit)(e)} noValidate>
      {error && <ErrorMessage>{parseRTKError(error)}</ErrorMessage>}
      <FormRow>
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
      </FormRow>
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
      <CheckboxContainer>
        <ControllerCheckbox
          name="agreeToPolicy"
          control={control}
          label="I agree to the Terms of Service and Privacy Policy."
          disabled={isLoading}
        />
      </CheckboxContainer>
      <CheckboxContainer>
        <ControllerCheckbox
          name="agreeToComms"
          control={control}
          label="Receive marketing communications (optional)"
          disabled={isLoading}
        />
      </CheckboxContainer>
      <Button type="submit" fullWidth disabled={isLoading}>
        {isLoading ? 'Creating Account…' : 'Sign Up'}
      </Button>
      <LoginContainer>
        Already have an account? <LoginLink href="/login">Login</LoginLink>
      </LoginContainer>
    </StyledForm>
  );
}
