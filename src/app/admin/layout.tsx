"use client";

import UserSetting from "@/components/fragments/UserSetting";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";
import { AdminSidebar } from "./dashboard/AdminSidebar";
import { UserProfile } from "@/types/userProfile";

const AdminLayout = ({ children }: { children: ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        return redirect("/login");
      }

      const { data: profile, error } = await supabase
        .from("user_profiles")
        .select("*")
        .eq("email", user.email)
        .single();

      if (error || profile?.role !== "admin") {
        return redirect("/error");
      }

      const userProfile = {
        ...user,
        ...profile,
      };
      setLoggedInUser(userProfile);
    };
    fetchUser();
  }, []);

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="bg-white dark:bg-black sticky top-0 z-100 flex h-16 shrink-0 items-center gap-2 border-b ps-4 pe-8 justify-between">
          <div className="flex h-16 shrink-0 items-center gap-2  ">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <UserSetting loggedInUser={loggedInUser} />
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-6">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default AdminLayout;
