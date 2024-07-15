import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import React from "react";
import { ToolHeader } from "../tools/tool-header";
import { ToolClose } from "../tools/tool-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolPickerColor } from "../tools/tool-picker-color";

export const BorderColorSidebar = ({
  editor,
  activeTool,
  setActiveTool,
}: ActiveToolEditorProps) => {

  const changeColor = (value : string) => {
    if(editor) {
      editor.changeStrokeColor(value);
    }
  }

  return (
    <aside
      className={cn(
        "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
        activeTool === "stroke-color" ? "visible" : "hidden"
      )}
    >
      <ToolHeader title="Border Color" description="Change your borders color" />
      <ScrollArea>
        <div className="space-y-6 p-4">
          <ToolPickerColor
            value={editor?.strokeColor || "#000000"}
            onChange={changeColor}
          />
        </div>
      </ScrollArea>

      <ToolClose onClick={() => setActiveTool("select")} />
    </aside>
  );
};
