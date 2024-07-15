import { LucideIcon } from "lucide-react";
import { ActiveToolTypes } from "./types";

export interface SidebarProps {
   icon: LucideIcon;
   label: string;
   onClick: () => void;
   isActive?: boolean;
}

export interface ActiveToolProps {
    activeTool : ActiveToolTypes,
    setActiveTool: (tool: ActiveToolTypes) => void;
}