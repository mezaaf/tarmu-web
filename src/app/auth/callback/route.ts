import { NextResponse } from "next/server";
// The client you created from the Server-Side Auth instructions
import { createClient } from "@/utils/supabase/server";
import { generateFromEmail } from "unique-username-generator";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  let next = searchParams.get("next") ?? "/";
  if (!next.startsWith("/")) {
    // if "next" is not a relative URL, use the default
    next = "/";
  }

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      const { data, error: userError } = await supabase.auth.getUser();
      if (userError) {
        console.error("Gagal mengambil data user:", userError.message);
        return NextResponse.redirect(`${origin}/error`);
      }

      const { data: existingUser } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("email", data.user?.email)
        .limit(1)
        .single();

      const generatedUsername = generateFromEmail(data.user?.email as string);

      if (!existingUser) {
        const { error: dbError } = await supabase.from("user_profiles").insert({
          email: data.user.email,
          username: generatedUsername,
          full_name: data.user.user_metadata.full_name,
          profile_picture_url: data.user.user_metadata.avatar_url,
          role: "user",
        });

        if (dbError) {
          console.error("Gagal menyimpan data user:", dbError.message);
          return NextResponse.redirect(`${origin}/error`);
        }
      } else if (existingUser.profile_picture_url === null) {
        const { error: dbError } = await supabase
          .from("user_profiles")
          .update({
            profile_picture_url: data.user.user_metadata.avatar_url,
          })
          .eq("email", data.user.email);

        if (dbError) {
          console.error("Gagal menyimpan data user:", dbError.message);
          return NextResponse.redirect(`${origin}/error`);
        }
      }

      const forwardedHost = request.headers.get("x-forwarded-host"); // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === "development";
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`);
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
