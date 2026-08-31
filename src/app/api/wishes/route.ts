import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { wishSchema } from "@/features/landing/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("wishes")
      .select("id, name, message, created_at")
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: error.message || "Gagal mengambil daftar ucapan" },
        { status: 500 },
      );
    }

    return NextResponse.json({ data: data || [] }, { status: 200 });
  } catch (err: unknown) {
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
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

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
  } catch (err: unknown) {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
