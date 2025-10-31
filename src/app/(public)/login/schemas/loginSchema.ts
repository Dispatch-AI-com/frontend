import { z } from 'zod';

export const emailSchema = z
  .string()
  .email('Please enter a valid email address');

export const loginSchema = z.object({
  workEmail: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
