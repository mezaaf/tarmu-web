"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

const AdminArticlePage = () => {
  return (
    <div className="flex flex-col gap-5">
      <header className="flex flex-row items-center justify-between">
        <h1 className="text-2xl font-bold">Data Artikel</h1>
        <Link href="/admin/dashboard/articles/create-article">
          <Button className="cursor-pointer">Tulis Artikel</Button>
        </Link>
      </header>
      <Card className="flex flex-col items-center justify-center p-5">
        <h1>Artikel</h1>
      </Card>
    </div>
  );
};

export default AdminArticlePage;
