import { emailSchema, passwordSchema } from "@/schemas/auth";
import { z } from "zod";

export const registerFormShema = z.object({
  full_name: z.string({ message: "Fullname is required" }),
  email: emailSchema,
  password: passwordSchema,
});

export type RegisterFormSchema = z.infer<typeof registerFormShema>;
