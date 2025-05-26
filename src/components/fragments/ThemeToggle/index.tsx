import React from "react";
import ClientOnly from "../Navbar/ClientOnly";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

const ThemeToogle = () => {
  const { theme, setTheme } = useTheme();
  return (
    <ClientOnly>
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
    </ClientOnly>
  );
};

export default ThemeToogle;
