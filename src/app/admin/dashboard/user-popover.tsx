"use client";

import { logout } from "@/app/actions/auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { getUserInitials } from "@/lib/utils";
import { UserProfle } from "@/types/userProfile";
import { LogOutIcon, Settings, UserIcon } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";

type UserPopoverProps = {
  userProfile: UserProfle;
};

const UserPopover = (props: UserPopoverProps) => {
  const { userProfile } = props;
  const handleLogout = async () => {
    await logout();
    return redirect("/");
  };
  return (
    <Popover>
      <PopoverTrigger asChild className="cursor-pointer">
        <Avatar>
          <AvatarImage
            src={userProfile?.profile_picture_url as string}
            alt="@shadcn"
          />

          <AvatarFallback className="font-semibold">
            {getUserInitials(userProfile?.user_metadata.full_name)}
          </AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent className="w-80 me-2">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {userProfile?.user_metadata.full_name}
            </h4>
            <p className="text-sm text-muted-foreground">
              {userProfile?.email}
            </p>
          </div>
          <div className="grid gap-2">
            <Command>
              <CommandList>
                <CommandItem>
                  <UserIcon />
                  <span>Profile</span>
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

export default UserPopover;
