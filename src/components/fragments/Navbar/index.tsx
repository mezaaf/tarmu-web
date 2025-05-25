"use client";

import { logout } from "@/app/actions/auth";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn, getUserInitials } from "@/lib/utils";
import { createClient } from "@/utils/supabase/client";
import { LogOutIcon, Menu, Moon, Settings, Sun, UserIcon } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { forwardRef, useEffect, useState } from "react";
import { largeMenuItems } from "./largeMenuItem";
import { smallMenuItems } from "./smallMenuItem";
import { UserProfle } from "@/types/userProfile";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const [loggedInUser, setLoggedInUser] = useState<UserProfle | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();

      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: profile, error } = await supabase
          .from("user_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (error) {
          setLoggedInUser(null);
        } else {
          const userProfile = {
            ...user,
            ...profile,
          };
          setLoggedInUser(userProfile);
        }
      } else {
        setLoggedInUser(user);
      }
    };

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    fetchUser();
    handleScroll();

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [router]);

  const handleLogout = async () => {
    await logout();
    setLoggedInUser(null);
    router.push("/");
  };

  return (
    <>
      <div
        className={`sticky top-0 left-0 z-100 flex h-10 w-full items-center px-5 transition-shadow duration-300 md:h-18 ${
          isScrolled &&
          "bg-background/80 shadow-md backdrop-blur dark:shadow-white/20"
        }`}
      >
        <div className="flex w-full items-center justify-between gap-10 lg:px-16">
          <div className="flex gap-4">
            <Link href="/" className="flex items-center gap-2">
              <h1 className="text-tosca text-lg font-bold md:text-2xl">
                tarmu<span className="text-gold">web</span>.
              </h1>
            </Link>
            <NavigationMenu className="hidden lg:flex">
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} ${
                      pathname === "/" ? "text-tosca" : ""
                    }`}
                  >
                    <Link href="/">Beranda</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} ${
                      pathname === "/aurod" ? "text-tosca" : ""
                    }`}
                  >
                    <Link href="/aurod">E-Da{"'"}wat</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                {largeMenuItems.map((item, index) => {
                  const isActive = item.children.some(
                    (c) => c.href === pathname
                  );
                  return (
                    <NavigationMenuItem key={index}>
                      <NavigationMenuTrigger
                        className={isActive ? "text-tosca" : ""}
                      >
                        {item.label}
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.children.map((child, childIndex) => (
                            <ListItem
                              key={childIndex}
                              title={child.title}
                              href={child.href}
                              className={
                                pathname === child.href ? "text-tosca" : ""
                              }
                            >
                              {child.description}
                            </ListItem>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  );
                })}
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={`${navigationMenuTriggerStyle()} ${
                      pathname === "/articles" ? "text-tosca" : ""
                    }`}
                  >
                    <Link href="/articles">Artikel</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink
                    asChild
                    className={navigationMenuTriggerStyle()}
                  >
                    <Link href="/warta">Warta</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="hidden items-center gap-2 lg:flex">
            <div className="flex items-center justify-center lg:gap-3">
              {!loggedInUser ? (
                <Button
                  onClick={() => router.push("/login")}
                  size={"xs"}
                  className="bg-tosca hover:bg-tosca/60 cursor-pointer rounded-full py-3.5 text-white flex items-center justify-center"
                >
                  Masuk
                </Button>
              ) : (
                <Popover>
                  <PopoverTrigger asChild className="cursor-pointer">
                    <Avatar>
                      <AvatarImage
                        src={loggedInUser.profile_picture_url as string}
                        alt="@shadcn"
                      />

                      <AvatarFallback className="font-semibold">
                        {getUserInitials(loggedInUser.user_metadata.full_name)}
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
              )}

              <Button
                variant={"transparent"}
                size={"icon"}
                className="group hover:bg-tosca/20 flex cursor-pointer items-center justify-center rounded-full p-2 transition-all duration-300"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? (
                  <Sun className="group-hover:text-tosca" strokeWidth={1.5} />
                ) : (
                  <Moon className="group-hover:text-tosca" strokeWidth={1.5} />
                )}
              </Button>
            </div>
          </div>
          <div className="flex w-full items-center justify-end gap-3 lg:hidden">
            {/* <Search size={20} /> */}
            {loggedInUser && (
              <Popover>
                <PopoverTrigger asChild>
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
            )}
            <Button
              variant={"transparent"}
              size={"icon"}
              className="group hover:bg-tosca/20 flex cursor-pointer items-center justify-center rounded-full p-0 transition-all duration-300"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <Sun
                  className="group-hover:text-tosca h-5 w-5"
                  strokeWidth={1.5}
                />
              ) : (
                <Moon
                  className="group-hover:text-tosca h-5 w-5"
                  strokeWidth={1.5}
                />
              )}
            </Button>
            <Drawer>
              <DrawerTrigger>
                <Menu size={20} className="mouse-pointer" />
              </DrawerTrigger>
              <DrawerContent className="space-y-4 p-5">
                <DrawerTitle>
                  <Link href={"/"} className="font-semibold">
                    <DrawerClose>Beranda</DrawerClose>
                  </Link>
                </DrawerTitle>
                <DrawerDescription hidden />
                <Link href={"/aurod"} className="font-semibold">
                  <DrawerClose>E-Da{"'"}wat</DrawerClose>
                </Link>
                <Accordion type="single" collapsible>
                  {smallMenuItems.map((item, index) => (
                    <AccordionItem
                      value={`item-${index}`}
                      key={index}
                      className="border-none"
                    >
                      <AccordionTrigger className="hover: cursor-pointer py-2 text-base font-semibold hover:no-underline">
                        {item.label}
                      </AccordionTrigger>
                      {item.children.map((child, childIndex) => (
                        <AccordionContent key={childIndex}>
                          <Link href={child.href}>
                            <DrawerClose>{child.label}</DrawerClose>
                          </Link>
                        </AccordionContent>
                      ))}
                    </AccordionItem>
                  ))}
                </Accordion>
                <DrawerClose className="flex items-start">
                  <Link href={"/articles"} className="font-semibold">
                    Artikel
                  </Link>
                </DrawerClose>
                <DrawerClose className="flex items-start">
                  <Link href={"/"} className="font-semibold">
                    Warta
                  </Link>
                </DrawerClose>
                {!loggedInUser && (
                  <DrawerClose asChild className="flex items-start">
                    <Link
                      href={"/login"}
                      className="bg-tosca hover:bg-tosca/60 cursor-pointer rounded-full py-1 text-white flex items-center justify-center"
                    >
                      Masuk
                    </Link>
                  </DrawerClose>
                )}
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </div>
    </>
  );
};

const ListItem = forwardRef<
  React.ElementRef<"div">,
  React.ComponentPropsWithoutRef<"div"> & { href: string; title?: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <Link href={href}>
        <NavigationMenuLink asChild>
          <div
            ref={ref}
            className={cn(
              "hover:bg-accent hover:text-foreground focus:bg-accent focus:text-foreground block cursor-pointer space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
              className
            )}
            {...props}
          >
            <div className="text-sm leading-none font-medium">{title}</div>
            <p className="text-muted-foreground line-clamp-2 text-sm leading-snug">
              {children}
            </p>
          </div>
        </NavigationMenuLink>
      </Link>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default Header;
