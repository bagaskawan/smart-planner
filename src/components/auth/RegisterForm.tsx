"use client";

import Link from "next/link";
import { GoogleButton } from "./GoogleButton";
import { GithubButton } from "./GithubButton";
import { signInWithGithub, signInWithGoogle, signup } from "@/lib/auth-actions";
import { useState } from "react";
import { useFormValidation } from "@/lib/RegisterValidation/useFormValidation";
import { FormData } from "@/lib/RegisterValidation/types";

export function RegisterForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    formData,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    isFormValid,
    setErrors,
  } = useFormValidation({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        await signup(formData);
      } catch (error) {
        setErrors((prev) => ({
          ...prev,
          general: "Registration failed. Please try again.",
        }));
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="flex-grow flex flex-col w-full text-center mt-2">
      <h1 className="text-4xl font-bold mb-2">Create an Account</h1>
      <p className="text-gray-600 mb-8 text-sm">
        Hey there! Let’s get you started on smarter planning.
      </p>
      <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
        <GoogleButton mode="register" onClick={signInWithGoogle} />
        <GithubButton mode="register" onClick={signInWithGithub} />
      </div>

      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-4 text-sm text-gray-400">or</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          onBlur={() => handleBlur("fullName")}
          placeholder="Full Name"
          className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 transition ${
            errors.fullName && touched.fullName
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-200 focus:ring-primary/50"
          }`}
          required
          aria-invalid={!!errors.fullName}
          aria-describedby={errors.fullName ? "fullName-error" : undefined}
        />
        {errors.fullName && touched.fullName && (
          <p
            id="fullName-error"
            className="text-red-500 text-sm mt-1 text-left"
          >
            {errors.fullName}
          </p>
        )}
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          required
        />
        <div className="flex items-center justify-between mb-4 text-sm">
          <div className="flex items-center">
            <span>New to Hade?</span>
            <Link
              href="/register"
              className="text-blue-700 hover:underline ml-1"
            >
              Create an Account
            </Link>
          </div>
          <Link
            href="/forgot-password"
            className="text-blue-700 hover:underline"
          >
            Forgot password?
          </Link>
        </div>
        <button
          type="submit"
          className="w-full p-3 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
