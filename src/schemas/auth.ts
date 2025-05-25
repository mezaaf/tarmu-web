import { z } from "zod";

export const emailSchema = z.string({ message: "Email wajib diisi" }).email({
  message: "Format email tidak tepat",
});
export const passwordSchema = z
  .string({ message: "Kata sandi wajib diisi" })
  .min(8, { message: "Kata sandi minimal 8 karakter" })
  .regex(/[A-Z]/, { message: "Kata sandi harus mengandung huruf kapital" })
  .regex(/[a-z]/, { message: "Kata sandi harus mengandung huruf kecil" })
  .regex(/[0-9]/, { message: "Kata sandi harus mengandung angka" });
