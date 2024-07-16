import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import { ArrowDownCircleIcon, ArrowUpCircleIcon } from "lucide-react";
import { BsBorderWidth } from "react-icons/bs";

export const Toolbar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {
   const color = editor?.getFillColor() ?? "black";
   const strokeColor = editor?.getStrokeColor() ?? "black";

   if(editor?.selectedObject.length === 0){
      return <div className="w-full mx-4 h-[56px] z-[49] flex gap-x-2" />
   }
   
   return (
      <div className="w-full mx-4 h-[56px] z-[49] flex gap-x-2">
         <div className="flex items-center justify-center h-full gap-x-2">
            <Hint label="Fill color" side="bottom">
               <Button
                  onClick={() => setActiveTool("fill")}
                  variant="ghost"
                  size="icon"
                  className={cn(activeTool == "fill" && "bg-gray-100")}
               >
                  <div
                     className="size-4 rounded-sm border"
                     style={{
                        backgroundColor:
                           typeof color === "string" ? color : "black",
                     }}
                  />
               </Button>
            </Hint>
            <Hint label="Border color" side="bottom">
               <Button
                  onClick={() => setActiveTool("stroke-color")}
                  variant="ghost"
                  size="icon"
                  className={cn(activeTool == "stroke-color" && "bg-gray-100")}
               >
                  <div
                     className="size-4 rounded-sm border-2"
                     style={{
                        borderColor: strokeColor
                     }}
                  />
               </Button>
            </Hint>
            <Hint label="Border Width" side="bottom">
               <Button
                  onClick={() => setActiveTool("stroke-width")}
                  variant="ghost"
                  size="icon"
                  className={cn(activeTool == "stroke-width" && "bg-gray-100")}
               >
                  <BsBorderWidth className="size-4" />
               </Button>
            </Hint>
            <Hint label="Bring to front" side="bottom">
               <Button
                  onClick={() => editor?.bringToFront()}
                  variant="ghost"
                  size="icon"
               >
                  <ArrowUpCircleIcon className="size-5" />
               </Button>
            </Hint>
            <Hint label="Send to Backwards" side="bottom">
               <Button
                  onClick={() => editor?.sendToBack()}
                  variant="ghost"
                  size="icon"
               >
                  <ArrowDownCircleIcon className="size-5" />
               </Button>
            </Hint>
         </div>
      </div>
   );
};
