"use server";

import { createClient } from "@/utils/supabase/server";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { generateFromEmail } from "unique-username-generator";

export async function register(registerData: {
  full_name: string;
  email: string;
  password: string;
}) {
  const supabase = await createClient();

  const credentials = {
    full_name: registerData.full_name,
    email: registerData.email,

    password: registerData.password,
  };

  const { error, data } = await supabase.auth.signUp({
    email: credentials.email,
    password: credentials.password,
    options: {
      data: {
        full_name: credentials.full_name,
      },
      //   emailRedirectTo: "/auth/callback",
    },
  });

  if (error) {
    return { status: true, message: error.message, user: null };
  } else if (data.user?.identities?.length === 0) {
    return {
      status: false,
      message: "Email sudah digunakan, silahkan gunakan email lain atau login.",
      user: null,
    };
  }

  return {
    status: true,
    message:
      "Pendaftaran berhasil, cek email anda untuk memverifikasi akun anda.",
    user: data.user,
  };
}

export async function login(loginData: { email: string; password: string }) {
  const supabase = await createClient();

  const credentials = {
    email: loginData.email,
    password: loginData.password,
  };

  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { status: false, message: error.message, user: null };
  }

  //create a user instance in user profiles table
  const { data: existingUser } = await supabase
    .from("user_profiles")
    .select("*")
    .eq("email", credentials?.email)
    .limit(1)
    .single();

  const generatedUsername = generateFromEmail(data.user.email as string);

  if (!existingUser) {
    const { error: insertError } = await supabase.from("user_profiles").insert({
      email: data.user.email,
      username: generatedUsername,
      full_name: data.user.user_metadata.full_name,
      role: "user",
    });

    if (insertError) {
      return { status: false, message: insertError.message, user: null };
    }
  }

  return { status: true, message: "Login berhasil", user: data.user };
}

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
