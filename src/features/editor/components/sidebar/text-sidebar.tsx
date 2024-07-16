import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";
import { ToolHeader } from "../tools/tool-header";
import { ToolClose } from "../tools/tool-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";

export const TextSidebar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {

  
   return (
      <aside
         className={cn(
            "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
            activeTool === "text" ? "visible" : "hidden"
         )}
      >
         <ToolHeader
            title="Text"
            description="Modify your text here!"
         />
         <ScrollArea>
            <div className="space-y-4 px-4 py-8 border-b">
               <Button className="w-full"
                  onClick={() => editor?.addTextbox("hallo")}>
                  Add Textbox
               </Button>
            </div>
         </ScrollArea>

         <ToolClose onClick={() => setActiveTool("select")} />
      </aside>
   );
};
