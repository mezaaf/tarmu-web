import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format } from "date-fns";
import { id } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formattedDate = (date: Date) => {
  return format(date, "EEEE, dd MMMM yyyy", { locale: id });
};

export function getUserInitials(full_name?: string): string {
  if (!full_name || full_name.trim() === "") return "";

  const words = full_name.trim().split(/\s+/);

  if (words.length === 1) return words[0][0].toUpperCase();

  return (words[0][0] + words[1][0]).toUpperCase();
}
