import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { HomeIcon, type LucideIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SidebarItemProps {
   icon: LucideIcon;
   active?: boolean | undefined;
   href: string;
   label: string;
   onClick?: () => void;
}

export const SidebarItem = ({
   icon: Icon,
   active,
   href,
   onClick,
   label,
}: SidebarItemProps) => {
   return (
      <Link
         href={href}
         onClick={onClick}
         className={cn(
            "w-full rounded-lg border-none hover:bg-white flex justify-start items-center px-4 py-2.5",
            active && "bg-white"
         )}
      >
         <Icon className="size-4 mr-4" />
         <p className={cn(active && "font-semibold text-md")}>{label}</p>
      </Link>
   );
};
