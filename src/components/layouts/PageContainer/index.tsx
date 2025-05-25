"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";
import Footer from "@/components/fragments/Footer";
import ScrollToTop from "@/components/fragments/ScrollToTop";
import Navbar from "@/components/fragments/Navbar";
import { usePathname } from "next/navigation";
// import { HeadMetaData } from "@/components/fragments/HeadMetaData";

const disableNavbar = [
  "login",
  "register",
  "reset-password",
  "forgot-password",
  "admin",
];

export const PageContainer = forwardRef<
  HTMLElement,
  React.HTMLAttributes<HTMLElement>
>(({ className, children, ...props }, ref) => {
  const pathname = usePathname();
  return (
    <div className="">
      {/* <HeadMetaData /> */}
      {!disableNavbar.includes(pathname.split("/")[1] ?? "") && <Navbar />}

      <main
        ref={ref}
        className={cn("flex flex-1 flex-col items-center w-full", className)}
        {...props}
      >
        {children}
      </main>
      <ScrollToTop />
      {!disableNavbar.includes(pathname.split("/")[1] ?? "") && <Footer />}
    </div>
  );
});

PageContainer.displayName = "PageContainer";
