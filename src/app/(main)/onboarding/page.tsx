// app/onboarding/page.tsx
import createClient from "@/utils/supabase/server"; // Sesuaikan path jika beda
import { redirect } from "next/navigation";
import GoalInputForm from "@/components/main/onboarding/GoalInputForm"; // Akan kita buat/sesuaikan

export default async function OnboardingPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Cek apakah user sudah punya MACRO goals
  // Menggunakan skema 'goals' kita: kolom 'type' bukan 'level'
  const { count, error: countError } = await supabase
    .from("goals")
    .select("*", { count: "exact", head: true }) // head:true hanya ambil count
    .eq("user_id", user.id)
    .eq("type", "MACRO"); // Sesuaikan dengan ENUM kita

  if (countError) {
    console.error("Error checking for macro goals:", countError);
    // Handle error, mungkin tampilkan halaman error atau redirect
  }

  if (count && count > 0) {
    redirect("/dashboard"); // Jika sudah punya macro goal, langsung ke dashboard
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-100 to-slate-100 p-4">
      <div className="max-w-2xl w-full p-6 sm:p-8 bg-white rounded-xl shadow-xl">
        <h1 className="text-3xl font-bold text-center text-slate-800 mb-6">
          Selamat Datang di Smart Goals!
        </h1>
        <p className="text-center text-slate-600 mb-8">
          Mari kita mulai perjalanan Anda mencapai impian besar.
        </p>
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-slate-700 mb-3">
            Langkah 1: Tentukan Tujuan Besar (Makro) Anda
          </h2>
          <p className="text-slate-600 mb-4 text-sm">
            Ini adalah impian besar yang ingin Anda capai dalam beberapa tahun
            ke depan. Contoh: "Menjadi Senior Software Engineer di perusahaan
            FAANG dalam 3 tahun", atau "Menerbitkan novel pertama saya dalam 2
            tahun."
          </p>
          <GoalInputForm userId={user.id} />
        </div>
      </div>
    </div>
  );
}
