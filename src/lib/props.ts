import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
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

export interface ToolShapeProps {
    onClick: () => void,
    icon: LucideIcon | IconType,
    iconClassName? : string,
}

export interface ShapeEditorProps {
    addCircle: () => void,
    addSquareRounded: () => void,
    addSquare: () => void,
    addTriangle: () => void,
    addTriangle180: () => void,
    addDiamond: () => void,
 }