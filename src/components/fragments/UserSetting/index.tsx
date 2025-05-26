"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUserInitials } from "@/lib/utils";
import { UserProfile } from "@/types/userProfile";
import { LayoutDashboard, LogOutIcon, Settings, UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

type UserSettingProps = {
  loggedInUser: UserProfile | null;
  handleLogout?: () => void;
};

const UserSetting = (props: UserSettingProps) => {
  const { loggedInUser, handleLogout } = props;
  const router = useRouter();

  const handleToDashboard = () => {
    if (loggedInUser?.role === "admin") {
      router.push("/admin/dashboard");
    } else {
      router.push("/user/dashboard");
    }
  };
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage
            src={loggedInUser?.profile_picture_url as string}
            alt="@shadcn"
          />

          <AvatarFallback className="font-semibold">
            {getUserInitials(loggedInUser?.user_metadata.full_name)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className=" me-2">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {loggedInUser?.user_metadata.full_name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {loggedInUser?.email}
            </p>
          </div>
          <div className="grid gap-2">
            <Command>
              <CommandList>
                <CommandItem>
                  <UserIcon />
                  <span>Profile</span>
                </CommandItem>
                <CommandItem onSelect={handleToDashboard}>
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </CommandItem>
                <CommandItem>
                  <Settings />
                  <span>Settings</span>
                </CommandItem>
                <CommandItem onSelect={handleLogout}>
                  <LogOutIcon />
                  <span>Logout</span>
                </CommandItem>
              </CommandList>
            </Command>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserSetting;
