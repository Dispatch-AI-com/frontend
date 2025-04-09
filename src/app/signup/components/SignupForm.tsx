"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack, Button } from "@mui/material";
import { signupSchema, type SignupFormData } from "../schemas/signupSchema";
import FormField from "@/components/FormField";
import ControllerInput from "@/components/ControllerInput";

export default function SignupForm() {
  const {
    control,
    handleSubmit,
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = (data: SignupFormData) => {
    console.log("Form data:", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <FormField label="Email" required>
          <ControllerInput
            name="workEmail"
            control={control}
            placeholder="Email"
          />
        </FormField>

        <FormField label="First Name" required>
          <ControllerInput
            name="firstName"
            control={control}
            placeholder="First Name"
          />
        </FormField>
      </Stack>

      <Button
        type="submit"
        variant="contained"
        fullWidth
        sx={{ mt: 2, borderRadius: "12px" }}
      >
        Sign Up
      </Button>
    </form>
  );
}
