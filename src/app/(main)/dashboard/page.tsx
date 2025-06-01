"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Pastikan Anda mengimpor useRouter
import useUser from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { signout } from "@/lib/auth-actions";

export default function Dashboard() {
  const { user, loading, error: userError } = useUser();
  const [displayName, setDisplayName] = useState<string | null>(null);
  const router = useRouter(); // Inisialisasi router

  useEffect(() => {
    if (user) {
      const nameFromMeta =
        user.user_metadata?.full_name || user.user_metadata?.name;
      if (nameFromMeta) {
        setDisplayName(nameFromMeta);
      } else if (user.email) {
        setDisplayName(user.email.split("@")[0]);
      }
      console.log("Dashboard user session from useUser:", user);
    }
  }, [user]);

  // Bagian useEffect untuk redirect jika user tidak ada dan tidak loading
  useEffect(() => {
    if (!loading && !user && !userError) {
      // Hanya redirect jika tidak loading, tidak ada user, dan tidak ada error
      console.log("No user session, redirecting to login from useEffect...");
      router.push("/login");
    }
  }, [user, loading, userError, router]); // Tambahkan userError ke dependency array

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Loading user data...</p>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>Error loading user data: {userError.message}</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <p>No user session found. Redirecting to login...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold">
          Welcome to Dashboard{displayName ? `, ${displayName}!` : "!"}
        </h1>
        <p className="text-gray-600 mt-2">You are successfully logged in.</p>
      </div>

      <form action={signout}>
        <Button type="submit" variant="outline" size="lg">
          Logout
        </Button>
      </form>
    </div>
  );
}
