"use client";

import { supabase } from "@/lib/auth-actions";
import Link from "next/link";
import { useState } from "react";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/reset-password`,
    });
    if (error) setError(error.message);
    else alert("Check your email for reset instructions!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-full max-w-md mx-auto text-center min-h-[60vh]">
      <h1 className="text-5xl font-bold mb-2">Forgot Password</h1>
      <p className="text-gray-600 mb-8">
        No worries, We'll send you instructions for reset
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200"
        >
          Reset Password
        </button>
      </form>
      <p className="mt-4 text-sm">
        Remember your password?{" "}
        <Link href="/login" className="text-blue-700 hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
}
