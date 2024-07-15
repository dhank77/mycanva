import { Button } from "@/components/ui/button";
import { SidebarProps } from "@/lib/props";
import { cn } from "@/lib/utils";

export const SidebarItem = ({
   icon: Icon,
   label,
   onClick,
   isActive,
}: SidebarProps) => {
   return (
      <Button
         onClick={onClick}
         variant="ghost"
         className={cn(
            "w-full h-full flex flex-col gap-x-2 items-center p-4 rounded-none",
            isActive && "bg-muted"
         )}
      >
         <Icon className="size-5 shrink-0" />
         <p className="text-sm font-semibold capitalize">{label}</p>
      </Button>
   );
};
