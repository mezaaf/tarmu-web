"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function logout() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return { status: false, message: error.message, user: null };
  }
}

export async function loginWithGoogle() {
  const origin = (await headers()).get("origin");
  const supabase = await createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${origin}/auth/callback`,
    },
  });

  if (error) {
    redirect("/error");
  } else if (data.url) {
    return redirect(data.url);
  }
}

export async function forgotPassword(forgotPasswordData: { email: string }) {
  const supabase = await createClient();
  const origin = (await headers()).get("origin");

  const { error } = await supabase.auth.resetPasswordForEmail(
    forgotPasswordData.email,
    {
      redirectTo: `${origin}/reset-password`,
    }
  );

  if (error) {
    return { status: false, message: error.message };
  }
  return { status: true, message: "Reset password berhasil" };
}

export async function resetPassword(
  resetPasswordData: { password: string },
  code: string
) {
  const supabase = await createClient();

  const { error: codeError } = await supabase.auth.exchangeCodeForSession(code);

  if (codeError) {
    return { status: false, message: codeError.message };
  }

  const { error } = await supabase.auth.updateUser({
    password: resetPasswordData.password,
  });

  if (error) {
    return { status: false, message: error.message };
  }
  return { status: true, message: "Reset password berhasil" };
}
