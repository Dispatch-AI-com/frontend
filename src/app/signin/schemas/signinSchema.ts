import { z } from 'zod';

export const signinSchema = z.object({
  workEmail: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password is required'),
});

export type SigninFormData = z.infer<typeof signinSchema>;
