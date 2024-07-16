import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import React from "react";
import { ToolHeader } from "../tools/tool-header";
import { ToolClose } from "../tools/tool-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Label } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";

export const BorderWidthSidebar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {
   const changeStrokeWidth = (value: number) => {
      if (editor) {
         editor.changeStrokeWidth(value);
      }
   };

   return (
      <aside
         className={cn(
            "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
            activeTool === "stroke-width" ? "visible" : "hidden"
         )}
      >
         <ToolHeader
            title="Border Options"
            description="Change your borders styles"
         />
         <ScrollArea>
            <div className="space-y-4 px-4 py-8  border-b">
               <Label className="text-sm">Border Width</Label>
               <Slider
                  value={[editor?.getStrokeWidth() ?? 0]}
                  onValueChange={(value) => changeStrokeWidth(value[0])}
               />
            </div>
            <div className="space-y-4 px-4 py-8  border-b">
               <Label className="text-sm">Border Style</Label>
               <Button variant="secondary" className="w-full rounded-xl h-16">
                  <div className="w-full border-4 border-black rounded-full" />
               </Button>
               <Button variant="secondary" className="w-full  rounded-xl h-16">
                  <div className="w-full border-black border-4 rounded-full border-dashed" />
               </Button>
               <Button variant="secondary" className="w-full  rounded-xl h-16">
                  <div className="w-full border-black border-4 rounded-full border-dotted" />
               </Button>
               <Button variant="secondary" className="w-full rounded-xl h-16">
                  <div className="w-full border-black border-4 rounded-full border-double " />
               </Button>
            </div>
         </ScrollArea>

         <ToolClose onClick={() => setActiveTool("select")} />
      </aside>
   );
};
