import { z } from "zod";
import { isValidPhoneNumber, CountryCode } from "libphonenumber-js";

export const signupSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  workEmail: z.string().email("Invalid email"),
  companyName: z.string().min(1, "Company name is required"),
  jobTitle: z.string().min(1, "Job title is required"),
  volume: z.number().min(1, "Volume is required"),
  notes: z.string().min(1, "Notes are required"),
  baseCity: z.string().min(1, "Base city is required"),
  agreeToPolicy: z.boolean().refine((data) => data === true, {
    message: "You must agree to our privacy policy.",
  }),
  agreeToComms: z.boolean().optional(),
  phoneNumber: z.object({
    country: z.string().min(1, "Country is required"),
    number: z.string().min(1, "Phone number is required"),
  }).refine((data) => {
    try {
      return isValidPhoneNumber(data.number, { defaultCountry: data.country as CountryCode });
    } catch {
      return false;
    }
  }, {
    message: "Invalid phone number",
  }),
});

export type SignupFormData = z.infer<typeof signupSchema>;