import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { wishSchema } from "@/features/landing/lib/schemas";
import { z } from "zod";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
export async function GET() {
  try {
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("wishes")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[wishes GET] supabase error", {
        message: error.message,
        code: error.code,
        details: error.details,
      });
      return NextResponse.json(
        {
          error: error.message || "Gagal mengambil daftar ucapan",
          code: error.code,
          details: error.details,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: data || [] }, { status: 200 });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = wishSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: z.flattenError(result.error).fieldErrors },
        { status: 400 },
      );
    }

    const { name, message } = result.data;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { data, error } = await supabase
      .from("wishes")
      .insert([
        {
          name,
          message,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message || "Gagal menyimpan ucapan" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
