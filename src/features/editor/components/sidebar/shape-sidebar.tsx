import { ActiveToolProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import React from "react";
import { ToolHeader } from "./tool-header";
import { ToolClose } from "./tool-close";

export const ShapeSidebar = ({
  activeTool,
  setActiveTool,
}: ActiveToolProps) => {
  return (
    <aside className={cn("relative w-[360px] z-[40] h-full bg-white border-r flex flex-col", 
      activeTool === "shapes" ? "visible" : "hidden"
    )}>
        <ToolHeader 
            title="Shapes"
            description="Create and edit shapes"
        />

        <ToolClose 
            onClick={() => setActiveTool("select")}
        />
    </aside>
  );
};
