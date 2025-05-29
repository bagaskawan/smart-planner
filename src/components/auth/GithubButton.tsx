"use client";

import { Github } from "lucide-react";
interface GithubButtonProps {
  onClick: () => void;
  mode: "login" | "register";
}

export function GithubButton({ onClick, mode }: GithubButtonProps) {
  const label = mode === "login" ? "Log in" : "Sign up";

  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-center gap-2 p-3 border border-gray-200 rounded-md hover:bg-gray-50 transition"
    >
      <Github size={18} />
      <span>{label} with GitHub</span>
    </button>
  );
}
