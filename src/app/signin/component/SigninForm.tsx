"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useAuth } from "@/app/signin/hooks/useAuth";
import { defaultSignupValues } from "@/app/signin/schemas/defaultSigninValues";
import {
  type SignupFormData,
  signupSchema,
} from "@/app/signin/schemas/signinSchema";
import Button from "@/app/signin/ui/Button";
import ControllerInput from "@/app/signin/ui/controller/ControllerInput";

import FormField from "./FormField";

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
`;

export default function SigninForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultSignupValues,
    mode: "onChange",
  });

  const { login, isLoading, error } = useAuth();

  const onSubmit = async (data: SignupFormData) => {
    console.warn('Attempting login with data:', {
      email: data.workEmail,
      password: '***' // 不记录实际密码
    });

    try {
      const success = await login({
        email: data.workEmail,
        password: data.password,
      });

      if (!success) {
        console.error("Login failed - no success response");
      }
    } catch (err) {
      console.error("Login error details:", {
        error: err,
        message: err instanceof Error ? err.message : 'Unknown error',
        stack: err instanceof Error ? err.stack : undefined
      });
    }
  };

  // 添加表单验证错误的日志
  if (Object.keys(errors).length > 0) {
    console.warn('Form validation errors:', errors);
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
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

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <Button 
        type="submit" 
        fullWidth 
        sx={{ mt: 2 }}
        disabled={isLoading}
      >
        {isLoading ? 'Signing in...' : 'Sign In'}
      </Button>
    </form>
  );
}
