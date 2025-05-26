import { register } from "@/utils/supabase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    const result = await register(body);

    if (result?.status === true) {
      return NextResponse.json({ message: result?.message }, { status: 200 });
    } else {
      return NextResponse.json({ message: result?.message }, { status: 400 });
    }
  } catch (err) {
    console.error("Internal Server Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
