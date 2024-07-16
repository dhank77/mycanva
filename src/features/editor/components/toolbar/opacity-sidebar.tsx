import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";
import { ToolHeader } from "../tools/tool-header";
import { ToolClose } from "../tools/tool-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";

export const OpacitySidebar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {

   const selectedObject = useMemo(() => editor?.selectedObject[0], [editor?.selectedObject])
   const [opacity, setOpacity] = useState(1)
   useEffect(() => {
      if(selectedObject){
         setOpacity(selectedObject.get("opacity") || 1)
      }
   }, [selectedObject])
   
   
   const changeData = (value: number) => {
      if (editor) {
         setOpacity(value)
         editor.changeOpacity(value);
      }
   };

   return (
      <aside
         className={cn(
            "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
            activeTool === "opacity" ? "visible" : "hidden"
         )}
      >
         <ToolHeader
            title="Opacity"
            description="Change your opacity object"
         />
         <ScrollArea>
            <div className="space-y-4 px-4 py-8  border-b">
               <Slider
                  value={[opacity]}
                  onValueChange={(value) => changeData(value[0])}
                  min={0}
                  max={1}
                  step={0.01}
               />
            </div>
         </ScrollArea>

         <ToolClose onClick={() => setActiveTool("select")} />
      </aside>
   );
};
