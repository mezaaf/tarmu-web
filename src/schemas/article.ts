import { z } from "zod";

export const articleFormSchema = z.object({
  title: z.string({ message: "Judul wajib diisi" }),
  author: z.string({ message: "Penulis wajib diisi" }),
  category: z.string({ message: "Kategori wajib diisi" }),
  coverUrl: z.string({ message: "Cover wajib diisi" }),
  content: z.string({ message: "Konten wajib diisi" }),
});

export type ArticleFormSchema = z.infer<typeof articleFormSchema>;
