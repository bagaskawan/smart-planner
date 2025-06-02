"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function GoalInputForm({ userId }: { userId: string }) {
  const [goal, setGoal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validasi via AI
      const res = await fetch("/api/ai/validate-goal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ goal }),
      });

      const { valid, reason, timeframe } = await res.json();

      if (!valid) {
        setError(`Goal tidak valid: ${reason}`);
        setIsLoading(false);
        return;
      }

      // Simpan goal ke database
      const saveRes = await fetch("/api/goals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          title: goal,
          level: "macro",
          timeframe,
        }),
      });

      const { goalId } = await saveRes.json();
      router.push(`/breakdown/${goalId}`);
    } catch (err) {
      setError("Terjadi kesalahan sistem");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <textarea
          value={goal}
          onChange={(e) => setGoal(e.target.value)}
          placeholder="Deskripsikan goal besar Anda..."
          className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          rows={4}
          required
        />
        <div className="mt-2 text-sm text-gray-500">
          Pastikan goal memiliki jangka waktu yang jelas (misal: "dalam 5
          tahun")
        </div>
      </div>

      {error && (
        <div className="text-red-500 p-3 bg-red-50 rounded-lg">{error}</div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 px-6 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isLoading ? "Memproses..." : "Lanjutkan ke Breakdown"}
      </button>
    </form>
  );
}
