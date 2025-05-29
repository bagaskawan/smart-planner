"use client";

import { useEffect } from "react";
import { createClient } from "@/utils/supabase/client";

export default function Dashboard() {
  const supabase = createClient();
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log("Dashboard session:", session);
    };
    checkSession();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Welcome to Dashboard!</h1>
      <p className="text-gray-600 mt-4">You are successfully logged in.</p>
    </div>
  );
}
