"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import styled from "styled-components";

import { useRegister } from "@/app/signup/hooks/useRegister";
import { defaultSignupValues } from "@/app/signup/schemas/defaultSignupValues";
import {
  type SignupFormData,
  signupSchema,
} from "@/app/signup/schemas/signupSchema";
import Button from "@/app/signup/ui/Button";
import ControllerCheckbox from "@/app/signup/ui/controller/ControllerCheckbox";
import ControllerInput from "@/app/signup/ui/controller/ControllerInput";

import FormField from "./FormField";

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

const SignInContainer = styled.div`
  text-align: center;
  margin-top: 24px;
  color: #666;
  font-size: 14px;
`;

const SignInLink = styled.a`
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
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultSignupValues,
  });

  const { register, isLoading, error } = useRegister();

  const onSubmit = async (data: SignupFormData) => {
    try {
      await register(data);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const isFormLoading = isSubmitting || isLoading;

  return (
    <StyledForm onSubmit={handleSubmit(onSubmit)}>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <FormRow>
        <FormField label="Last Name">
          <ControllerInput
            name="lastName"
            control={control}
            placeholder="Last Name"
            disabled={isFormLoading}
          />
        </FormField>

        <FormField label="First Name">
          <ControllerInput
            name="firstName"
            control={control}
            placeholder="First Name"
            disabled={isFormLoading}
          />
        </FormField>
      </FormRow>
      
      <FormField label="Work email address">
        <ControllerInput
          name="workEmail"
          control={control}
          placeholder="Email address"
          type="email"
          disabled={isFormLoading}
        />
      </FormField>
      
      <FormField label="Password">
        <ControllerInput
          name="password"
          control={control}
          placeholder="Password"
          type="password"
          disabled={isFormLoading}
        />
      </FormField>
      
      <CheckboxContainer>
        <ControllerCheckbox
          name="agreeToPolicy"
          control={control}
          label="I agree to the Terms of Service and Privacy Policy."
          disabled={isFormLoading}
        />
      </CheckboxContainer>
  
      <Button 
        type="submit" 
        fullWidth 
        disabled={isFormLoading}
        sx={{ mt: 2 }}
      >
        {isFormLoading ? 'Creating Account...' : 'Sign Up'}
      </Button>
      
      <SignInContainer>
        Already Have an account? <SignInLink href="/signin">Sign in</SignInLink>
      </SignInContainer>
    </StyledForm>
  );
}
