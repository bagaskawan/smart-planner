"use client";

import { signInWithGithub, signInWithGoogle } from "@/lib/auth-actions";
import { GoogleButton } from "./GoogleButton";
import { GithubButton } from "./GithubButton";
import useUser from "@/hooks/useUser";

export function LoginForm() {
  const user = useUser();
  console.log("User data:", user);
  return (
    <div className="flex-grow flex flex-col justify-center max-w-sm mx-auto w-full text-center">
      <h1 className="text-5xl font-bold mb-2">Hi there!</h1>
      <p className="text-sm text-gray-600 mb-4">
        Welcome to Hade. Organize life with smart planning
      </p>
      <div className="text-md text-gray-600">
        <GoogleButton
          mode="login"
          onClick={signInWithGoogle}
          className="mt-4 p-2"
        />
        <GithubButton
          mode="login"
          onClick={signInWithGithub}
          className="mt-4 p-2"
        />
      </div>
    </div>
  );
}
