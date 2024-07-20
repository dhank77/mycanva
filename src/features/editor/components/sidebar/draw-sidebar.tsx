import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import React from "react";
import { ToolHeader } from "../tools/tool-header";
import { ToolClose } from "../tools/tool-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolPickerColor } from "../tools/tool-picker-color";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export const DrawSidebar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {

   const changeColor = (value: string) => {
      if (editor) {
         editor.changeStrokeColor(value);
      }
   };
   const changeStrokeWidth = (value: number) => {
    if (editor) {
       editor.changeStrokeWidth(value);
    }
 };

   return (
      <aside
         className={cn(
            "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
            activeTool === "draw" ? "visible" : "hidden"
         )}
      >
         <ToolHeader
            title="Draw Setting"
            description="Change your draw options"
         />
         <ScrollArea>
            <div className="space-y-4 px-4 py-8  border-b">
               <Label className="text-sm">Brush Width</Label>
               <Slider
                  value={[editor?.getStrokeWidth() ?? 0]}
                  onValueChange={(value) => changeStrokeWidth(value[0])}
               />
            </div>
            <div className="space-y-6 p-4">
               <ToolPickerColor
                  value={editor?.getStrokeColor() || "#000000"}
                  onChange={changeColor}
               />
            </div>
         </ScrollArea>

         <ToolClose onClick={() => {
          setActiveTool("select");
          editor?.disableDrawMode();
         }} />
      </aside>
   );
};
