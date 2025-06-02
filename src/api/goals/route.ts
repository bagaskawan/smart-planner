// app/api/goals/route.ts
import { NextResponse } from "next/server";
import createClient from "@/utils/supabase/server"; // Atau dari @/lib/supabase/server jika Anda memindahkannya

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const goalData = await request.json();

    // Validasi input dasar
    if (!goalData.title || !goalData.type) {
      return NextResponse.json(
        { error: "Judul dan tipe goal dibutuhkan." },
        { status: 400 }
      );
    }

    // Pastikan tipe goal sesuai dengan ENUM yang ada di DB
    // (Validasi tambahan bisa dilakukan di sini jika perlu)

    const { data: newGoal, error } = await supabase
      .from("goals")
      .insert({
        user_id: user.id,
        parent_goal_id: goalData.parent_goal_id || null,
        title: goalData.title,
        description: goalData.description || null,
        type: goalData.type, // Misal: 'MACRO', 'ANNUAL', dll.
        status: goalData.status || "TODO", // Default 'TODO'
        target_date: goalData.target_date || null,
        due_date: goalData.due_date || null,
        is_ai_generated: goalData.is_ai_generated || false,
        priority: goalData.priority || null,
        progress: goalData.progress || 0,
      })
      .select() // Mengambil data yang baru diinsert
      .single(); // Karena kita hanya insert satu

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json(
        { error: `Gagal menyimpan goal: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(newGoal, { status: 201 });
  } catch (error: any) {
    console.error("API error creating goal:", error);
    return NextResponse.json(
      { error: error.message || "Terjadi kesalahan pada server." },
      { status: 500 }
    );
  }
}
