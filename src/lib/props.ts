import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { ActiveToolTypes } from "./types";

export interface SidebarProps {
   icon: LucideIcon;
   label: string;
   onClick: () => void;
   isActive?: boolean;
}

export interface ToolShapeProps {
   onClick: () => void;
   icon: LucideIcon | IconType;
   iconClassName?: string;
}

export interface ActiveToolProps {
   activeTool: ActiveToolTypes;
   setActiveTool: (tool: ActiveToolTypes) => void;
}

export interface EditorProps {
   addCircle: () => void;
   addSquareRounded: () => void;
   addSquare: () => void;
   addTriangle: () => void;
   addTriangle180: () => void;
   addDiamond: () => void;
   changeFillColor: (color: string) => void;
   changeStrokeColor: (color: string) => void;
   changeStrokeWidth: (width: number) => void;
   changeOpacity: (opacity: number) => void;
  
   getFillColor: () => string;
   getStrokeColor: () => string;
   getStrokeWidth: () => number;

   bringToFront: () => void;
   sendToBack: () => void;

   canvas: fabric.Canvas;
   selectedObject: fabric.Object[];
}

export interface ActiveToolEditorProps extends ActiveToolProps {
   editor: EditorProps | undefined;
}

export interface BuildEditorProps {
   canvas: fabric.Canvas;
   fillColor: string;
   strokeColor: string;
   strokeWidth: number;
   selectedObject: fabric.Object[];
   setFillColor: (color: string) => void;
   setStrokeColor: (color: string) => void;
   setStrokeWidth: (width: number) => void;
}
