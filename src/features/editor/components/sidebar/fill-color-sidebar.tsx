import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import React from "react";
import { ToolHeader } from "./tool-header";
import { ToolClose } from "./tool-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolPickerColor } from "./tool-picker-color";

export const FillColorSidebar = ({
  editor,
  activeTool,
  setActiveTool,
}: ActiveToolEditorProps) => {

  const changeColor = (value : string) => {
    if(editor) {
      editor.changeFillColor(value);
    }
  }

  return (
    <aside
      className={cn(
        "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
        activeTool === "fill" ? "visible" : "hidden"
      )}
    >
      <ToolHeader title="Fill Color" description="Create your own amazing color" />
      <ScrollArea>
        <div className="space-y-6 p-4">
          <ToolPickerColor
            value={editor?.getFillColor() || "#000000"}
            onChange={changeColor}
          />
        </div>
      </ScrollArea>

      <ToolClose onClick={() => setActiveTool("select")} />
    </aside>
  );
};
