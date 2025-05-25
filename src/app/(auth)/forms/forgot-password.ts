import { emailSchema } from "@/schemas/auth";
import { z } from "zod";

export const forgotPasswordFormSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormSchema = z.infer<typeof forgotPasswordFormSchema>;
