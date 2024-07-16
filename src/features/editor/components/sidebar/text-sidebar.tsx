import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";
import { ToolHeader } from "../tools/tool-header";
import { ToolClose } from "../tools/tool-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const TextSidebar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {
   const [text, setText] = useState("")
  
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
            <div className="space-y-4 px-4 py-8 border-b flex flex-col items-center">
               <Textarea 
                  className="w-full"
                  rows={10}
                  onChange={(e) => setText(e.target.value)}
               />
               <Button className="w-full"
                  onClick={() => editor?.addTextbox(text ?? "textbox")}>
                  Add Textbox
               </Button>
               <Button 
                  className="w-full"
                  variant="secondary"
                  onClick={() => editor?.addTextbox("heading", {
                     fontSize: 80,
                     fontWeight: 700,
                  })}>
                  <span className="text-2xl font-semibold">Add Heading</span>
               </Button>
               <Button 
                  className="w-full"
                  variant="secondary"
                  onClick={() => editor?.addTextbox("subheading", {
                     fontSize: 60,
                     fontWeight: 500,
                  })}>
                  <span className="text-lg font-medium">Add Subheading</span>
               </Button>
               <Button 
                  className="w-full"
                  variant="secondary"
                  onClick={() => editor?.addTextbox("Paragraf", {
                     fontSize: 32,
                  })}>
                  Add Paragraf
               </Button>
            </div>
         </ScrollArea>

         <ToolClose onClick={() => setActiveTool("select")} />
      </aside>
   );
};
