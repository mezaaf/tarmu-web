import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ReactNode } from "react";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }
  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-md">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="flex flex-col items-center">
              <Link href={"/"}>
                <Image
                  src={"/images/logos/logo.svg"}
                  alt="logo-pondok"
                  width={1000}
                  height={1000}
                  className="w-20"
                  priority
                />
              </Link>
            </CardTitle>
            <CardDescription className="text-center">
              Selamat Datang
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-6">{children}</CardContent>
        </Card>
      </div>
    </div>
  );
}
