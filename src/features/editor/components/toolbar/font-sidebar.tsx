import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import React from "react";
import { ToolHeader } from "../tools/tool-header";
import { ToolClose } from "../tools/tool-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { fonts } from "@/lib/types";

export const FontSidebar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {

   return (
      <aside
         className={cn(
            "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
            activeTool === "font" ? "visible" : "hidden"
         )}
      >
         <ToolHeader
            title="Font Style"
            description="Change your fonts styles"
         />
         <ScrollArea>
            <div className="space-y-4 p-4">
               {
                  fonts.map((font) => (
                     <Button
                        key={font}
                        variant="secondary"
                        onClick={() => editor?.changeFont(font)}
                        className={cn("w-full h-14 justify-start",
                           editor?.getFont() === font && "border-2 border-blue-500"
                        )}
                        style={{ 
                           fontFamily : font,
                         }}
                     >
                        {font}
                     </Button>
                  ))
               }
            </div>
         </ScrollArea>

         <ToolClose onClick={() => setActiveTool("select")} />
      </aside>
   );
};
