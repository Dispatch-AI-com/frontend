
import { userSchema } from "@/schema/userSchema";
import axios from "axios";
import { z } from "zod";

type UserData = z.infer<typeof userSchema>;

export default async function signUpService(userData: UserData) {
  const result = userSchema.safeParse(userData);

  if (!result.success) {
    const message = result.error.errors.map(e => e.message).join(", ");
    throw new Error(`Zod Error ${message}`);
  }

  return await axios.post("http://localhost:3000/auth/signup", userData, {
    withCredentials: true,
  });
}
