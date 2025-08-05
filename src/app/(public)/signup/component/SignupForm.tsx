'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';

import GoogleOAuthButton from '@/components/GoogleOAuthButton';
import { useSignupUserMutation } from '@/features/auth/authApi';
import { useAppSelector } from '@/redux/hooks';
import { parseRTKError } from '@/utils/parseRTKError';

import { defaultSignupValues } from '../schemas/defaultSignupValues';
import { type SignupFormData, signupSchema } from '../schemas/signupSchema';
import Button from '../ui/Button';
import ControllerCheckbox from '../ui/controller/ControllerCheckbox';
import ControllerInput from '../ui/controller/ControllerInput';
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
    margin-bottom: 24px;
  }
`;

const InstructionText = styled.p`
  text-align: center;
  font-size: 18px;
  color: #6d6d6d;
  margin-bottom: 24px;

  @media (max-width: 600px) {
    font-size: 14px;
    margin-bottom: 12px;
  }
`;

const StyledForm = styled.form`
  width: 100%;
`;

const FormRow = styled.div`
  display: flex;
  gap: 16px;
  justify-content: space-between;

  @media (max-width: 600px) {
    flex-direction: row;
    gap: 8px;
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 22px 0 30px 0;
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
  const token = useAppSelector(s => s.auth.token);

  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const { control, handleSubmit } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultSignupValues,
    mode: 'onSubmit',
  });

  useEffect(() => {
    if (token) {
      router.replace('/admin/overview');
    }
  }, [token, router]);

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
      <WelcomeText>Get Started With Smart Agent!</WelcomeText>
      <InstructionText>
        Enter your credentials to access your account
      </InstructionText>
      <GoogleOAuthButton text="Sign up with Google" disabled={isLoading} />
      {error && <ErrorMessage>{parseRTKError(error)}</ErrorMessage>}
      <FormRow>
        <FormField label="First Name" mb={0}>
          <ControllerInput
            name="firstName"
            control={control}
            placeholder="First Name"
            disabled={isLoading}
          />
        </FormField>

        <FormField label="Last Name" mb={0}>
          <ControllerInput
            name="lastName"
            control={control}
            placeholder="Last Name"
            disabled={isLoading}
          />
        </FormField>
      </FormRow>
      <FormField label="Work Email Address" mb={0}>
        <ControllerInput
          name="workEmail"
          control={control}
          type="email"
          placeholder="you@company.com"
          disabled={isLoading}
        />
      </FormField>

      <FormField label="Password" mb={0}>
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
          label={
            <>
              I agree to the{' '}
              <a
                href="/terms"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', color: '#060606' }}
              >
                Terms of Service
              </a>{' '}
              and{' '}
              <a
                href="/privacy"
                target="_blank"
                rel="noopener noreferrer"
                style={{ textDecoration: 'underline', color: '#060606' }}
              >
                Privacy Policy
              </a>
              .
            </>
          }
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
        Already have an account?{' '}
        <LoginLink href="/login" style={{ fontWeight: 'bold' }}>
          Login
        </LoginLink>
      </LoginContainer>
    </StyledForm>
  );
}
