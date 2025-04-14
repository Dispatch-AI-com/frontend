// form/defaultValues.ts
import { SignupFormData } from "../schemas/signupScehma";

export const defaultSignupValues: Partial<SignupFormData> = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  acceptTerms: false, // 初始为 false，等用户勾选
};
