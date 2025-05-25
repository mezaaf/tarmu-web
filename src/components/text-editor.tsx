"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Dropcursor from "@tiptap/extension-dropcursor";
import FontFamily from "@tiptap/extension-font-family";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import TipTapYoutube from "@tiptap/extension-youtube";
import { EditorContent, useEditor, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  ImagePlus,
  Italic,
  List,
  ListOrdered,
  Redo,
  UnderlineIcon,
  Undo,
  Youtube,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { toast } from "sonner";

export default function TextEditor({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        history: {
          depth: 10,
        },
        bulletList: {
          keepMarks: true,
          keepAttributes: true,
        },
      }),
      Underline,
      FontFamily,
      TextAlign.configure({ types: ["heading", "paragraph"] }),

      TipTapYoutube.configure({
        nocookie: true,
        loop: true,
        HTMLAttributes: {
          class: "w-full aspect-ratio my-4",
        },
        progressBarColor: "white",
      }),
      Image,
      Dropcursor,
    ],
    content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        spellcheck: "false",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) {
    return null;
  }

  return (
    <div className="w-full">
      <div
        className={cn(
          "border rounded-md overflow-auto max-h-[40rem] pb-6 custom-vertical-scroll my-editor-container"
        )}
      >
        <MenuBar editor={editor} />
        <div className="max-h-full p-4 overflow-auto">
          <EditorContent
            editor={editor}
            className="prose dark:prose-invert bg-background p-2"
          />
        </div>
      </div>
      <div></div>
    </div>
  );
}

function MenuBar({ editor }: { editor: Editor | null }) {
  const [chanceEmbedYt, setChanceEmbedYt] = useState(1);
  const urlRefYoutube = useRef<HTMLInputElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!editor) return;

    const checkForYoutubeEmbed = () => {
      const hasYoutubeEmbed = editor.getJSON().content?.some((node) => {
        return node.type === "youtube"; // Ganti dengan tipe node yang sesuai
      });
      if (!hasYoutubeEmbed) {
        setChanceEmbedYt(1); // Reset state jika tidak ada embed
      }
    };

    // Memanggil fungsi setiap kali konten editor berubah
    editor.on("update", checkForYoutubeEmbed);

    // Cleanup listener saat komponen unmount
    return () => {
      editor.off("update", checkForYoutubeEmbed);
    };
  }, [editor]);

  const addImage = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        const src = reader.result as string;
        setChanceEmbedYt(0);
        editor?.chain().focus().setImage({ src }).run();
      };
      reader.readAsDataURL(file);
    },
    [editor]
  );

  const MAX_FILE_SIZE = 2 * 1024 * 1024;

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File terlalu besar! Maksimal ukuran file adalah 2MB.");
        e.target.value = "";
        return;
      }
      addImage(file);
      e.target.value = "";
      setIsModalOpen(false); // Tutup modal setelah upload
    }
  };

  function addYoutube() {
    if (urlRefYoutube.current) {
      if (
        !urlRefYoutube.current.value ||
        urlRefYoutube.current.value.trim() === ""
      )
        return;
      setChanceEmbedYt(0);
      editor?.commands.setYoutubeVideo({
        src: urlRefYoutube.current.value,
      });
    }
  }

  if (!editor) return null;

  return (
    <div className="bg-muted p-2 flex flex-wrap gap-2 sticky top-0 z-[1]">
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={editor.isActive("bold") ? "bg-muted-foreground/20" : ""}
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={editor.isActive("italic") ? "bg-muted-foreground/20" : ""}
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive("underline") ? "bg-muted-foreground/20" : ""}
      >
        <UnderlineIcon className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("left").run()}
        className={
          editor.isActive({ textAlign: "left" }) ? "bg-muted-foreground/20" : ""
        }
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("center").run()}
        className={
          editor.isActive({ textAlign: "center" })
            ? "bg-muted-foreground/20"
            : ""
        }
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("right").run()}
        className={
          editor.isActive({ textAlign: "right" })
            ? "bg-muted-foreground/20"
            : ""
        }
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        className={
          editor.isActive({ textAlign: "justify" })
            ? "bg-muted-foreground/20"
            : ""
        }
      >
        <AlignJustify className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={
          editor.isActive("bulletList") ? "bg-muted-foreground/20" : ""
        }
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={
          editor.isActive("orderedList") ? "bg-muted-foreground/20" : ""
        }
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={chanceEmbedYt <= 0}
            className="disabled:cursor-none"
          >
            <Youtube className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share link</DialogTitle>
            <DialogDescription>
              Anyone who has this link will be able to view this.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                ref={urlRefYoutube}
                id="link"
                placeholder="https://youtu.be/xkSV5hrIBEg?si=CP0xa8zKpuX1Z1dO"
              />
            </div>
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="secondary" onClick={addYoutube}>
                Apply
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            disabled={chanceEmbedYt <= 0}
            className="disabled:cursor-none"
          >
            <ImagePlus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload gambar</DialogTitle>
            <DialogDescription>
              Anda bisa upload gambar dengan ukuran tidak lebih dari 2MB.
            </DialogDescription>
          </DialogHeader>
          <div className="flex items-center space-x-2">
            {/* <div className="grid flex-1 gap-2">
              <Label htmlFor="link" className="sr-only">
                Link
              </Label>
              <Input
                ref={urlRefImage}
                id="link"
                placeholder="Enter the image URL here..."
              />
            </div> */}

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload File
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="hidden"
            />
          </div>
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                type="button"
                variant="secondary"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().undo()}
        className={editor.isActive("bold") ? "bg-muted-foreground/20" : ""}
      >
        <Undo className="h-4 w-4" />
      </Button>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().redo()}
        className={editor.isActive("bold") ? "bg-muted-foreground/20" : ""}
      >
        <Redo className="h-4 w-4" />
      </Button>
    </div>
  );
}
