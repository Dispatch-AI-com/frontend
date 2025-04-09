import { z } from "zod";

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  workEmail: z.string().email("Invalid email"),
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  volume: z.number().min(1, "Volume is required"),
  notes: z.string().min(1, "Notes are required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  baseCity: z.string().min(1, "Base city is required"),
  agreeToPolicy: z.literal(true, {
    errorMap: () => ({ message: "You must agree to our privacy policy." }),
  }),
  agreeToComms: z.boolean().optional()
});

export type SignupFormData = z.infer<typeof signupSchema>; 