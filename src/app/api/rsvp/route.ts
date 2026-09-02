import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { rsvpSchema } from "@/features/landing/lib/schemas";
import { z } from "zod";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const result = rsvpSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { errors: z.flattenError(result.error).fieldErrors },
        { status: 400 },
      );
    }

    const { name, attendance, partySize } = result.data;
    const supabase = createClient(supabaseUrl, supabaseKey);
    const { error } = await supabase.from("rsvps").insert([
      {
        name,
        attendance,
        party_size: partySize,
      },
    ]);

    if (error) {
      console.error("[rsvp] supabase insert error", {
        message: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return NextResponse.json(
        {
          error: error.message || "Gagal menyimpan RSVP",
          code: error.code,
          details: error.details,
          hint: error.hint,
        },
        { status: 500 },
      );
    }

    return NextResponse.json(
      { data: { name, attendance, party_size: partySize } },
      { status: 201 },
    );
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server" },
      { status: 500 },
    );
  }
}
