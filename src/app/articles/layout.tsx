import { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Artikel",
    template: "%s - Pondok Ngujur",
    absolute: "",
  },
};

export default function ArticleLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
