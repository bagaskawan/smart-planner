"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/auth-actions";

export default function ProfileSetup() {
  const [fullName, setFullName] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        window.location.href = "/login";
      }
      setLoading(false);
    };
    checkUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { error: updateError } = await supabase.auth.updateUser({
      data: { full_name: fullName },
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      window.location.href = "/dashboard";
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen max-w-md mx-auto text-center">
      <h1 className="text-4xl font-bold mb-2">Complete Your Profile</h1>
      <p className="text-gray-600 mb-8 text-sm">
        Please provide your full name to complete your registration.
      </p>

      {error && <p className="text-red-500">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className="w-full p-3 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
          required
        />
        <button
          type="submit"
          className="w-full p-3 bg-black text-white rounded-md hover:bg-gray-800 transition duration-200"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
}
