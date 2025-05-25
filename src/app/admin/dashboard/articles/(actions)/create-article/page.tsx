"use client";

import React, { useState } from "react";
import TextEditor from "@/components/text-editor";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { articleFormSchema, ArticleFormSchema } from "@/schemas/article";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import slugify from "react-slugify";
import { toast } from "sonner";
import { createClient } from "@/utils/supabase/client";

const AdminCreateArticlePage = () => {
  const [key, setKey] = useState(0);
  const [coverFile, setCoverFile] = useState<File | null>(null);

  const form = useForm<ArticleFormSchema>({
    defaultValues: {
      title: "",
      author: "",
      category: "",
      coverUrl: "",
      content: "",
    },
    resolver: zodResolver(articleFormSchema),
  });

  const MAX_EXCERPT_LENGTH = 150;
  function generateExcerpt(text: string, maxLength = MAX_EXCERPT_LENGTH) {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  }

  // Tangani perubahan input file cover
  const handleCoverFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setCoverFile(e.target.files[0]);
      // Set field coverUrl jadi nama file saja (atau kosongkan jika ingin diisi dengan url setelah upload)
      form.setValue("coverUrl", e.target.files[0].name);
    }
  };

  const handleArticleSubmit = async (values: ArticleFormSchema) => {
    try {
      const supabase = createClient();
      const { title, author, category, content } = values;

      const slug = slugify(title);

      // 2. Ambil plain text excerpt dari content (anggap content adalah HTML string)
      const parser = new DOMParser();
      const doc = parser.parseFromString(content, "text/html");
      const textContent = doc.body.textContent || "";
      const excerpt = generateExcerpt(textContent);

      // 3. Upload cover image ke Supabase Storage jika ada
      let coverUrl = "";
      if (coverFile) {
        const path = `articles/covers/${Date.now()}_${coverFile.name}`;
        const { error: uploadError } = await supabase.storage
          .from("articleimages")
          .upload(path, coverFile, {
            cacheControl: "3600",
            upsert: false,
          });

        if (uploadError) {
          throw uploadError;
        }

        const { data: publicUrlData } = supabase.storage
          .from("articleimages")
          .getPublicUrl(path);

        coverUrl = publicUrlData.publicUrl;
      }

      const { data } = await supabase.auth.getUser();
      // 4. Simpan data artikel ke Supabase
      const { error: insertError } = await supabase.from("articles").insert([
        {
          title,
          slug,
          author,
          category,
          cover_url: coverUrl,
          content,
          excerpt,
          user_id: data.user?.id,
          created_at: new Date().toISOString(),
        },
      ]);

      if (insertError) {
        throw insertError;
      }

      toast.success("Artikel berhasil disimpan!");
      form.reset();
      setCoverFile(null);
      setKey((k) => k + 1);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error("Gagal menyimpan artikel: " + (error.message || error));
    }
  };

  return (
    <div className="flex flex-col items-center gap-5">
      <h1 className="text-2xl font-bold">Tulis Artikel</h1>
      <Card className="w-full p-5 min-h-screen">
        <div className="w-full overflow-hidden">
          <Form {...form}>
            <form
              className="flex flex-col items-center gap-6"
              onSubmit={form.handleSubmit(handleArticleSubmit)}
            >
              <div className="flex flex-row gap-6 flex-wrap">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Masukkan judul artikel"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kategori</FormLabel>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          value={field.value}
                        >
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Pilih kategori" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Kategori</SelectLabel>
                              <SelectItem value="khutbah">
                                Khutbah Jumat
                              </SelectItem>
                              <SelectItem value="tokoh">
                                Biografi Tokoh
                              </SelectItem>
                              <SelectItem value="qa">Tanya Jawab</SelectItem>
                              <SelectItem value="cerpen">Cerpen</SelectItem>
                              <SelectItem value="sastra">Sastra</SelectItem>
                              <SelectItem value="resensi">Resensi</SelectItem>
                              <SelectItem value="puisi">Puisi</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="author"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Author</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="text"
                          placeholder="Masukkan author"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* File input cover */}
                <FormItem>
                  <FormLabel>Cover</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverFileChange}
                    />
                  </FormControl>
                </FormItem>
              </div>

              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem className="space-y-4 w-full">
                    <FormControl>
                      <TextEditor
                        key={key}
                        content={field.value}
                        onChange={(content) => {
                          // Bersihkan whitespace & line break kosong dari konten
                          const cleanContent = content.replace(/\s/g, "");
                          const isEmptyContent =
                            /^(<p><\/p>|<p><br><\/p>)*$/.test(cleanContent);

                          if (isEmptyContent) {
                            field.onChange("");
                          } else {
                            field.onChange(content);
                          }
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="mt-5 cursor-pointer">
                Simpan
              </Button>
            </form>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default AdminCreateArticlePage;
