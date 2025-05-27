import { login } from "@/utils/supabase/service";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    if (!body) {
      return NextResponse.json({ message: "Bad request" }, { status: 400 });
    }

    const result = await login(body);

    if (result?.status === true) {
      return NextResponse.json({ message: result?.message }, { status: 200 });
    } else {
      if (result.message === "Invalid login credentials") {
        return NextResponse.json(
          { message: "Email atau password salah." },
          { status: 400 }
        );
      } else if (result.message === "Email not confirmed") {
        return NextResponse.json(
          {
            message:
              "Email belum dikonfirmasi, silahkan cek email anda untuk konfirmasi.",
          },
          { status: 400 }
        );
      } else {
        return NextResponse.json({ message: result?.message }, { status: 400 });
      }
    }
  } catch (err) {
    console.error("Internal Server Error:", err);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
