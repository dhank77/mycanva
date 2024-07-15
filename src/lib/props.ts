import { LucideIcon } from "lucide-react";

export interface SidebarProps {
    icon: LucideIcon,
    label: string,
    onClick: () => void,
    isActive? : boolean,
}