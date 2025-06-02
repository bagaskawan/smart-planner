// app/api/ai/validate-macro-goal/route.ts
import { NextResponse } from "next/server";
// import { MistralService } from '@/lib/mistral'; // Asumsikan layanan AI Anda
// Mockup MistralService jika belum ada
const MistralService = {
  generate: async (prompt: string) => {
    console.log("AI Prompt for Macro Goal Validation:", prompt);
    // Simulasi respons AI
    await new Promise((resolve) => setTimeout(resolve, 1000));
    // Contoh Logika Sederhana untuk Mockup:
    if (
      prompt.toLowerCase().includes("tahun") ||
      prompt.toLowerCase().includes("years")
    ) {
      const match = prompt.match(/(\d+)\s*(tahun|year)/i);
      const years = match ? parseInt(match[1]) : null;
      if (years && years > 0) {
        return JSON.stringify({
          isValid: true,
          reason: "Goal tampak baik dan memiliki jangka waktu.",
          extractedTimeframeYears: years,
        });
      }
    }
    if (prompt.length < 20) {
      return JSON.stringify({
        isValid: false,
        reason: "Deskripsi goal terlalu singkat.",
        suggestion: "Coba buat lebih detail dan spesifik.",
        extractedTimeframeYears: null,
      });
    }
    return JSON.stringify({
      isValid: true,
      reason: "Goal tampak cukup baik untuk diproses lebih lanjut.",
      suggestion:
        "Pastikan untuk memecahnya menjadi langkah-langkah yang lebih kecil nanti.",
      extractedTimeframeYears: null, // AI mungkin tidak selalu bisa mengekstrak timeframe
    });
  },
};

export async function POST(request: Request) {
  try {
    const { goalText, timeframeText } = await request.json();

    if (!goalText || typeof goalText !== "string") {
      return NextResponse.json(
        { error: 'Input "goalText" tidak valid atau kosong.' },
        { status: 400 }
      );
    }

    // Gabungkan informasi untuk prompt AI
    let combinedGoalInfo = `Analisis kelayakan tujuan makro berikut: "${goalText}".`;
    if (
      timeframeText &&
      typeof timeframeText === "string" &&
      timeframeText.trim() !== ""
    ) {
      combinedGoalInfo += ` Pengguna memberikan perkiraan jangka waktu: "${timeframeText}".`;
    }
    combinedGoalInfo += `
      Berikan respons dalam format JSON dengan struktur:
      {
        "isValid": boolean, // Apakah goal ini cukup baik sebagai goal makro?
        "reason": string, // Alasan jika tidak valid, atau komentar jika valid.
        "suggestion": string, // Saran perbaikan jika tidak valid, atau saran umum jika valid.
        "extractedTimeframeYears": number | null // Jangka waktu dalam tahun yang diekstrak/diestimasi dari teks. Null jika tidak bisa ditentukan.
      }
      Pastikan isValid bernilai true jika goal cukup baik untuk diproses lebih lanjut, meskipun timeframe tidak eksplisit.
      Jika timeframe eksplisit disebutkan, coba ekstrak. Jika tidak, extractedTimeframeYears bisa null.
    `;

    const aiResponseString = await MistralService.generate(combinedGoalInfo);
    const result = JSON.parse(aiResponseString);

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("AI Macro Goal Validation error:", error);
    return NextResponse.json(
      { error: error.message || "Validasi AI gagal total." },
      { status: 500 }
    );
  }
}
