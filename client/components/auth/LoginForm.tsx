"use client";

import React from "react";
import { useForm, FieldValues } from "react-hook-form";
import { Button } from "../ui/button";
import axios from "@/lib/axios";
import { LoginSchema } from "@/schemas/login-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { setCookie } from "cookies-next";
import SignupForm from "./SignupForm";

type Props = {};
type FormData = z.infer<typeof LoginSchema>;

export default function LoginForm({ }: Props) {
  const router = useRouter();

  const {
    register,
    formState: { errors, isSubmitting },
    reset,
    handleSubmit,
  } = useForm<FormData>({
    defaultValues: {
      email: "user1@gmail.com",
      password: "Test@1234",
    },
    resolver: zodResolver(LoginSchema),
  });

  const handleLoginSubmit = async (data: FormData) => {
    toast.loading("Logging in...", { id: "login" });

    try {
      const response = await axios.post(
        "http://127.0.0.1:8080/api/v1/auth/login",
        {
          username: data.email, // Convert email to username for backend
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );


      if (response.data.access_token) {
        setCookie("token", response.data.access_token, {
          maxAge: 60 * 60 * 24, // 1 day
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          path: "/",
        });

        toast.success("Logged in successfully!", { id: "login" });
        router.push("/dashboard");
      } else {
        throw new Error("No access token received");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      const errorMessage = error.response?.data?.msg ||
        error.message ||
        "An error occurred. Try again later.";
      toast.error(errorMessage, { id: "login" });
    } finally {
      reset();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-12">
      <div
        className="w-full max-w-md rounded-3xl p-10 space-y-8"
        style={{
          backgroundColor: "#F0EFEF",
          boxShadow: "0 20px 50px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2 className="text-3xl font-extrabold text-center text-indigo-900 tracking-wide uppercase">
          Login
        </h2>

        <form onSubmit={handleSubmit(handleLoginSubmit)} className="space-y-6">
          {/* Email Field (used as username) */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Email <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("email")}
              className={`w-full px-4 py-3 border rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-400 ${errors.email ? "border-red-400" : "border-gray-300"
                }`}
              placeholder="you@example.com"
              autoComplete="email"
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-700">
              Password <span className="text-red-500">*</span>
            </label>
            <input
              type="password"
              {...register("password")}
              className={`w-full px-4 py-3 border rounded-xl shadow-md outline-none focus:ring-2 focus:ring-indigo-400 ${errors.password ? "border-red-400" : "border-gray-300"
                }`}
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password.message}
              </span>
            )}
          </div>

          {/* Login Button */}
          <Button
            className="w-full bg-blue-900 hover:bg-indigo-700 text-white py-3 rounded-xl text-lg font-semibold transition-all duration-300 shadow-md hover:shadow-lg"
            size={"lg"}
            disabled={isSubmitting}
            type="submit"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </form>

        <p className="text-center text-sm text-gray-500 pt-2">
          Don't have an account?{" "}
          <span
            className="text-indigo-600 underline cursor-pointer hover:opacity-80 transition-all"
            onClick={() => router.push("/register")}
          >
            Sign Up
          </span>

        </p>
      </div>
    </div>
  );
}