import { z } from "zod";
import { emailSchema, passwordSchema } from "@/schemas/auth";

export const loginFormShema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type LoginFormSchema = z.infer<typeof loginFormShema>;
