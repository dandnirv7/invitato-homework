import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { rsvpSchema } from "@/features/landing/lib/schemas";
import { createClient } from "@/lib/supabase/server";
import { z } from "zod";

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

    const {
      name,
      attendance,
      partySize,
      countryCode,
      phoneNumber,
      address,
      email,
    } = result.data;
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data, error } = await supabase
      .from("rsvps")
      .insert([
        {
          name,
          attendance,
          party_size: partySize ?? 1,
          country_code: countryCode ?? null,
          phone_number: phoneNumber ?? null,
          address: address ?? null,
          email: email ?? null,
        },
      ])
      .select()
      .single();

    if (error) {
      return NextResponse.json(
        { error: error.message || "Gagal menyimpan RSVP" },
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
