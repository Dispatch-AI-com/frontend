// schemas/signupSchema.ts
import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  
  // ✅ 接受条款：提交时必须为 true，但初始值允许 false
  acceptTerms: z.boolean().refine(val => val === true, {
    message: "You must accept the terms and conditions"
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;
