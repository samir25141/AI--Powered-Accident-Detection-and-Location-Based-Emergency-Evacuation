"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "@/lib/axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SignupSchema } from "@/schemas/signup-schema";
import { Button } from "../ui/button";
import LoginForm from "./LoginForm";
type FormData = z.infer<typeof SignupSchema>;

export default function SignupForm() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = async (data: FormData) => {
    toast.loading("Creating account...", { id: "signup" });

    try {
      const res = await axios.post("http://127.0.0.1:8080/api/v1/auth/register", {
        email: data.email,     // MUST match exactly with backend expectation
        password: data.password,
        name: data.name        // optional
      }, {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json'
        }
      });

      toast.success("Account created successfully!", { id: "signup" });
      router.push("/auth/login");
    } catch (err: any) {
      const message = err.response?.data?.msg || "Signup failed. Try again.";
      toast.error(message, { id: "signup" });
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4 py-12">
      <div
        className="w-full max-w-md rounded-3xl p-10 space-y-8"
        style={{
          backgroundColor: "#F0EFEF",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-900 uppercase">
          Sign Up
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Name Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Enter Your Full Name"
              className={`w-full px-4 py-3 border rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-400 ${errors.name ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.name && (
              <span className="text-sm text-red-500">{errors.name.message}</span>
            )}
          </div>

          {/* Email Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              type=""
              {...register("email")}
              placeholder="you@example.com"
              className={`w-full px-4 py-3 border rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-400 ${errors.email ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.email && (
              <span className="text-sm text-red-500">{errors.email.message}</span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">Password</label>
            <input
              type=""
              {...register("password")}
              placeholder="••••••••"
              className={`w-full px-4 py-3 border rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-400 ${errors.password ? "border-red-400" : "border-gray-300"}`}
            />
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-900 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 pt-2">
          Already have an account?{" "}
          <span
            className="text-indigo-600 underline cursor-pointer hover:opacity-80"
            onClick={() => router.push("/auth/login")}
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
