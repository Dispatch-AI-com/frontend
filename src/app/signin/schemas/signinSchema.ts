import { z } from 'zod';

export const signinSchema = z.object({
  workEmail: z.string().email('Invalid email'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/\d/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
      'Password must contain at least one special character',
    ),
});

export type SigninFormData = z.infer<typeof signinSchema>;
