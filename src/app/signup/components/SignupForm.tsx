"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "@mui/material";
import { signupSchema, type SignupFormData } from "@/app/signup/schemas/signupSchema";
import FormField from "@/app/signup/layout/FormField";
import ControllerInput from "@/components/ui/controller/ControllerInput";
import { defaultSignupValues } from "@/app/signup/schemas/defaultSignupValues";
import ControllerSelect from "@/components/ui/controller/ControllerSelect";
import PhoneNumberInput from "@/components/ui/controller/PhoneNumberInput";
import ControllerTextarea from "@/components/ui/controller/ControllerTextarea";
import ControllerCheckbox from "@/components/ui/controller/ControllerCheckbox";
import Button from "@/components/ui/Button";
export default function SignupForm() {
  const { control, handleSubmit, formState: { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: defaultSignupValues,
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <FormField label="Last Name">
          <ControllerInput
            name="lastName"
            control={control}
            placeholder="Last Name"
          />
        </FormField>

        <FormField label="First Name">
          <ControllerInput
            name="firstName"
            control={control}
            placeholder="First Name"
          />
        </FormField>
      </Stack>
      <FormField label="Work email address">
          <ControllerInput
            name="workEmail"
            control={control}
            placeholder="Email address"
          />
      </FormField>
      <FormField label="Company name">
        <ControllerInput
          name="companyName"
          control={control}
          placeholder="Company Name"
        />
      </FormField>
      <FormField label="Job title">
        <ControllerInput
          name="jobTitle"
          control={control}
          placeholder="Job title"
        />
      </FormField>
      <FormField label="What is your call volume per year?">
        <ControllerSelect
          name="volume"
          control={control}
          options={[
            { value: 1000, label: "1000 hours/year" },
            { value: 2000, label: "2000 hours/year" },
            { value: 3000, label: "3000 hours/year" },
            { value: 4000, label: "4000 hours/year" },
            { value: 5000, label: "5000 hours/year" },
          ]}
          placeholder="Please select"
        />
      </FormField>
      <FormField size="large" label="What else you can tell us about your project">
        <ControllerTextarea
          name="notes"
          control={control}
          placeholder="Fill in your project details"
        />
      </FormField>
      <FormField label="Phone number">
        <PhoneNumberInput
          control={control}
          name="phoneNumber"
          error={!!errors.phoneNumber}
        />
      </FormField>
      <FormField label="Base city">
        <ControllerSelect
          placeholder="Select base city"
          name="baseCity"
          control={control}
          options={[
            { value: "Sydney", label: "Sydney/Australia" },
            { value: "Melbourne", label: "Melbourne/Australia" },
            { value: "Brisbane", label: "Brisbane/Australia" },
            { value: "Perth", label: "Perth/Australia" },
          ]}
        />
      </FormField>
      <FormField size="small" mb={1.5}>
        <ControllerCheckbox
          name="agreeToComms"
          control={control}
          label="I agree to receive communications from SmartAgent"
        />
      </FormField>
      <FormField size="small" mb={2}>
        <ControllerCheckbox
          name="agreeToPolicy"
          control={control}
          label="By submitting this form, you agree to SmartAgent storing and processing your data in accordance with our privacy policy"
        />
      </FormField>

      <Button
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        Sign Up
      </Button>
    </form>
  );
}
