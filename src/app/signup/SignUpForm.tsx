"use client";

// This is a client component, so it can use hooks like useState and useEffect
import React from "react"
import { useForm } from 'react-hook-form';
import { zodResolver } from "@hookform/resolvers/zod"
import { signupSchema } from "./schemas/signupScehma"
import { defaultSignupValues } from "./schemas/defaultValues"
import { z } from "zod"

type FormData = z.infer<typeof signupSchema>

export default function SignupForm() {
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: defaultSignupValues,
    resolver: zodResolver(signupSchema),
  })

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data)
    // TODO: 调用后端 API 提交注册数据
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* First Name & Last Name */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium">First Name</label>
          <input
            {...register("firstName")}
            className="w-full border px-3 py-2 rounded"
            placeholder="First Name"
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Last Name</label>
          <input
            {...register("lastName")}
            className="w-full border px-3 py-2 rounded"
            placeholder="Last Name"
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName.message}</p>
          )}
        </div>
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-medium">Email address</label>
        <input
          type="email"
          {...register("email")}
          className="w-full border px-3 py-2 rounded"
          placeholder="Email address"
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email.message}</p>
        )}
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full border px-3 py-2 rounded"
          placeholder="Password"
        />
        {errors.password && (
          <p className="text-sm text-red-500">{errors.password.message}</p>
        )}
      </div>

      {/* Terms & Conditions */}
      <div className="flex items-start gap-2">
        <input type="checkbox" {...register("acceptTerms")} />
        <label className="text-sm">
          I agree to the{" "}
          <a href="/terms" className="underline">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="/privacy" className="underline">
            Privacy Policy
          </a>
        </label>
      </div>
      {errors.acceptTerms && (
        <p className="text-sm text-red-500">{errors.acceptTerms.message}</p>
      )}

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-black text-white py-2 px-4 rounded hover:bg-gray-800"
      >
        Sign Up
      </button>
    </form>
  )
}
