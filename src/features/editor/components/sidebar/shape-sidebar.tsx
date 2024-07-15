import { ActiveToolEditorProps, ActiveToolProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import React from "react";
import { ToolHeader } from "./tool-header";
import { ToolClose } from "./tool-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolShape } from "./tool-shape";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";


export const ShapeSidebar = ({
  editor,
  activeTool,
  setActiveTool,
}: ActiveToolEditorProps) => {
  return (
    <aside
      className={cn(
        "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
        activeTool === "shapes" ? "visible" : "hidden"
      )}
    >
      <ToolHeader title="Shapes" description="Create and edit shapes" />
      <ScrollArea>
        <div className="grid grid-cols-3 gap-4 p-4">
          <ToolShape onClick={() => editor?.addSquareRounded()} icon={FaSquare} />
          <ToolShape onClick={() => editor?.addCircle()} icon={FaCircle} />
          <ToolShape onClick={() => editor?.addSquare()} icon={FaSquareFull} />
          <ToolShape onClick={() => editor?.addTriangle()} icon={IoTriangle} />
          <ToolShape
            onClick={() => editor?.addTriangle180()}
            icon={IoTriangle}
            iconClassName="rotate-180"
          />
          <ToolShape onClick={() => editor?.addDiamond()} icon={FaDiamond} />
        </div>
      </ScrollArea>

      <ToolClose onClick={() => setActiveTool("select")} />
    </aside>
  );
};
