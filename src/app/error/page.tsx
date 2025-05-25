"use client";

import { SectionContainer } from "@/components/layouts/SectionContainer";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ErrorPage() {
  const router = useRouter();
  return (
    <SectionContainer
      padded
      minFullscreen
      className="flex flex-col items-center justify-center gap-3"
    >
      <h1>Maaf, halaman ini hanya bisa di akses oleh admin.</h1>
      <Button onClick={() => router.push("/")} className="cursor-pointer">
        Kembali ke beranda
      </Button>
    </SectionContainer>
  );
}
