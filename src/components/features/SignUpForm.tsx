
import { Container } from '@mui/material'
import React from 'react'
import FormTitle from '../ui/FormTitle'
import InputTextField from '../ui/InputTextField'
import ButtonGroup from '../ui/ButtonGroup'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { userSchema } from '@/schema/userSchema'
import { z } from "zod";
import { signUpValues } from '@/schema/signupValues'
import signUpService from '@/services/signUpService'

export default function SignUpForm() {
    type FormData = z.infer<typeof userSchema>
    const { reset, control, handleSubmit, formState: { errors }, clearErrors  } = useForm<FormData>({
      resolver: zodResolver(userSchema),
      defaultValues: signUpValues,
    });
    const onSubmit = async (data: FormData) => {
    try {
      console.log("Submitting form with data:", data);
      const response = await signUpService(data)
      console.log("Form data:", data);
      console.log("Response:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      clearErrors();
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
        <Container maxWidth="xs" sx={{ my: 4, textAlign: 'center', display:'flex' , flexDirection:'column', gap:2 }}>
            <FormTitle title="Sign Up" />
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <InputTextField
                label="Name"
                {...field}
                error={Boolean(errors.name)}
                helperText={errors.name?.message}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <InputTextField
                label="Email"
                {...field}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <InputTextField
                label="Password"
                {...field}
                type="password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
                />
              )}
            />
            <ButtonGroup onReset={() => reset()} />
        </Container>
    </form>
  )
}
