
import { userSchema } from "@/schema/userSchema";
import axios from "axios";
import { z } from "zod";

type UserData = z.infer<typeof userSchema>;

export default async function signUpService(userData: UserData) {
  return await axios.post("http://localhost:3000/auth/signup", userData, {
    withCredentials: true,
  });
}