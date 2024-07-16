import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ActiveToolEditorProps } from "@/lib/props";
import { cn, isTypeText } from "@/lib/utils";
import { ArrowDownCircleIcon, ArrowUpCircleIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import { BsBorderWidth } from "react-icons/bs";
import { FaBold } from "react-icons/fa";
import { RxTransparencyGrid } from "react-icons/rx";

export const Toolbar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {
   const color = editor?.getFillColor() ?? "black";
   const strokeColor = editor?.getStrokeColor() ?? "black";
   const bold = editor?.getBold() || 400;

   const typeObject = editor?.selectedObject[0]?.type;
   const isText = isTypeText(typeObject);

   const [properties, setProperties] = useState({
      bold : bold,
      color : color,
      strokeColor : strokeColor,
   })

   const toggleBold = () => {
      if (editor) {
         editor.changeBold();
      }
      setProperties({
         ...properties,
         bold : properties.bold == 400 ? 700 : 400
      })
   };

   if (editor?.selectedObject.length === 0) {
      return <div className="w-full mx-4 h-[56px] z-[49] flex gap-x-2" />;
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
                           typeof properties.color === "string" ? properties.color : "black",
                     }}
                  />
               </Button>
            </Hint>
            {!isText && (
               <Hint label="Border color" side="bottom">
                  <Button
                     onClick={() => setActiveTool("stroke-color")}
                     variant="ghost"
                     size="icon"
                     className={cn(
                        activeTool == "stroke-color" && "bg-gray-100"
                     )}
                  >
                     <div
                        className="size-4 rounded-sm border-2"
                        style={{
                           borderColor: properties.strokeColor,
                        }}
                     />
                  </Button>
               </Hint>
            )}
            {!isText && (
               <Hint label="Border Width" side="bottom">
                  <Button
                     onClick={() => setActiveTool("stroke-width")}
                     variant="ghost"
                     size="icon"
                     className={cn(
                        activeTool == "stroke-width" && "bg-gray-100"
                     )}
                  >
                     <BsBorderWidth className="size-4" />
                  </Button>
               </Hint>
            )}
            {isText && (
               <Hint label="Font" side="bottom">
                  <Button
                     onClick={() => setActiveTool("font")}
                     variant="ghost"
                     size="icon"
                     className={cn(
                        "w-auto p-2",
                        activeTool == "font" && "bg-gray-100"
                     )}
                  >
                     <div className="max-w-[100px] flex gap-x-2 items-center">
                        <span className="truncate">{editor?.getFont()}</span>
                        <ChevronDown className="size-4" />
                     </div>
                  </Button>
               </Hint>
            )}
            {isText && (
               <Hint label="Bold" side="bottom">
                  <Button
                     onClick={() => toggleBold()}
                     variant="ghost"
                     size="icon"
                     className={cn(
                        "w-auto p-2",
                        properties.bold > 500 && "bg-gray-100"
                     )}
                  >
                     <FaBold />
                  </Button>
               </Hint>
            )}
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
            <Hint label="Opacity" side="bottom">
               <Button
                  onClick={() => setActiveTool("opacity")}
                  variant="ghost"
                  size="icon"
                  className={cn(activeTool == "opacity" && "bg-gray-100")}
               >
                  <RxTransparencyGrid className="size-5" />
               </Button>
            </Hint>
         </div>
      </div>
   );
};
