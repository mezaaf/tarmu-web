"use client";

import { SectionContainer } from "@/components/layouts/SectionContainer";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

const ErrorPage = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <SectionContainer
      padded
      minFullscreen
      className="flex flex-col items-center justify-center gap-5"
    >
      <h2 className="text-2xl font-semibold">Terjadi kesalahan 😣</h2>
      <Button className="w-fit" onClick={() => reset()}>
        <RotateCcw />
        Muat Ulang
      </Button>
    </SectionContainer>
  );
};

export default ErrorPage;
