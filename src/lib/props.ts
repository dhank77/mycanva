import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import { ActiveToolTypes } from "./types";
import { ITextOptions } from "fabric/fabric-impl";

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
   addTextbox: (text: string, options? : ITextOptions) => void;

   changeFillColor: (color: string) => void;
   changeStrokeColor: (color: string) => void;
   changeStrokeWidth: (width: number) => void;
   changeOpacity: (opacity: number) => void;
   changeFont: (font: string) => void;
   changeBold: () => void;
   changeItalic: () => void;
   changeUnderline: () => void;
   changeLinethrough: () => void;
   changeAlign: (value: string) => void;
  
   getFillColor: () => string;
   getStrokeColor: () => string;
   getStrokeWidth: () => number;
   getFont: () => string;
   getBold: () => number;
   getItalic: () => string;
   getUnderline: () => boolean;
   getLinethrough: () => boolean;
   getAlign: () => boolean;

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
   font: string;
   fillColor: string;
   strokeColor: string;
   strokeWidth: number;
   selectedObject: fabric.Object[];

   setFont: (font: string) => void;
   setFillColor: (color: string) => void;
   setStrokeColor: (color: string) => void;
   setStrokeWidth: (width: number) => void;
}
