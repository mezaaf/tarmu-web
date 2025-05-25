import { passwordSchema } from "@/schemas/auth";
import { z } from "zod";

export const resetPasswordFormSchema = z.object({
  password: passwordSchema,
});

export type ResetPasswordFormSchema = z.infer<typeof resetPasswordFormSchema>;
