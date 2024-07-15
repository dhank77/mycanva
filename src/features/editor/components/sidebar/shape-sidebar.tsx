import { ActiveToolProps, ShapeEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import React from "react";
import { ToolHeader } from "./tool-header";
import { ToolClose } from "./tool-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolShape } from "./tool-shape";
import { FaCircle, FaSquare, FaSquareFull } from "react-icons/fa";
import { IoTriangle } from "react-icons/io5";
import { FaDiamond } from "react-icons/fa6";

interface ShapeSideBarProps extends ActiveToolProps {
  editor: ShapeEditorProps | undefined;
}

export const ShapeSidebar = ({
  editor,
  activeTool,
  setActiveTool,
}: ShapeSideBarProps) => {
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
          <ToolShape onClick={() => {}} icon={FaSquare} />
          <ToolShape onClick={() => editor?.addCircle()} icon={FaCircle} />
          <ToolShape onClick={() => {}} icon={FaSquareFull} />
          <ToolShape onClick={() => {}} icon={IoTriangle} />
          <ToolShape
            onClick={() => {}}
            icon={IoTriangle}
            iconClassName="rotate-180"
          />
          <ToolShape onClick={() => {}} icon={FaDiamond} />
        </div>
      </ScrollArea>

      <ToolClose onClick={() => setActiveTool("select")} />
    </aside>
  );
};
