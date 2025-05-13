import http from "@/utils/axios";

export const login = (email, password) =>
  http(`/public/login`, { method: "POST", data: { email, password } });

export const signup = (userName, firstName, lastName, password, email) =>
  http(`/public/signup`, {
    method: "POST",
    data: {
      userName,
      firstName,
      lastName,
      password,
      email,
    },
  });
