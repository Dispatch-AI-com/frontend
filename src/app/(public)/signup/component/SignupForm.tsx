'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useState } from 'react';
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
    <g fill="none" fill-rule="evenodd">
      <path d="M0 0h16v16H0z" />
      <path
        d="M8 2.056c3.804 0 7.5 3.165 7.5 5.944s-3.696 5.944-7.5 5.944S.5 10.777.5 8 4.196 2.056 8 2.056zm0 1C4.717 3.056 1.5 5.812 1.5 8s3.217 4.944 6.5 4.944S14.5 10.19 14.5 8c0-2.19-3.217-4.944-6.5-4.944zm0 2.11a2.833 2.833 0 1 1 0 5.667 2.833 2.833 0 0 1 0-5.666zm0 1a1.833 1.833 0 1 0 0 3.667 1.833 1.833 0 0 0 0-3.666z"
        fill="#BBB"
        fill-rule="nonzero"
      />
    </g>
  </svg>
);

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
  const [showPassword, setShowPassword] = useState(false);
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
        <div style={{ position: 'relative' }}>
          <ControllerInput
            name="password"
            control={control}
            placeholder="Password"
            type={showPassword ? 'text' : 'password'}
            disabled={isLoading}
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
