"use client";

import { SearchForm } from "@/components/search-form";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Book, Home, User } from "lucide-react";
import Link from "next/link";

const items = [
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: Home,
  },
  {
    title: "Data User",
    url: "/admin/dashboard/user-data",
    icon: User,
  },
  {
    title: "Data Artikel",
    url: "/admin/dashboard/articles",
    icon: Book,
  },
];

export function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Link href="#" className="ms-3 my-3 flex items-center gap-2">
          <h1 className="text-tosca text-lg font-bold md:text-2xl">
            tarmu<span className="text-gold">web</span>.
          </h1>
        </Link>
        <SearchForm />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="-mb-3">
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <Link key={item.title} href={item.url}>
                  <SidebarMenuItem className="cursor-pointer">
                    <SidebarMenuButton asChild url={item.url}>
                      <div>
                        <item.icon />
                        {item.title}
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </Link>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
