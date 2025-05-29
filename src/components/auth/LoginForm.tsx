"use client";

import { useState } from "react";
import { login, signInWithGithub, signInWithGoogle } from "@/lib/auth-actions";
import Link from "next/link";
import { GoogleButton } from "./GoogleButton";
import { GithubButton } from "./GithubButton";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  return (
    <div className="flex-grow flex flex-col justify-center max-w-md mx-auto w-full text-center">
      <h1 className="text-5xl font-bold mb-2">Hi there!</h1>
      <p className="text-gray-600 mb-8">
        Welcome to Hade. Organize life with smart planning
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-2 gap-4">
        <GoogleButton mode="login" onClick={signInWithGoogle} />
        <GithubButton mode="login" onClick={signInWithGithub} />
      </div>

      <div className="flex items-center my-6">
        <div className="flex-grow h-px bg-gray-200"></div>
        <span className="px-4 text-sm text-gray-400">or</span>
        <div className="flex-grow h-px bg-gray-200"></div>
      </div>

      <form action="" className="space-y-4 max-w-md mx-auto">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
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
          formAction={login}
          className="w-full p-3 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200"
        >
          Login
        </button>
      </form>
    </div>
  );
}
