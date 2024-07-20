import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { ActiveToolEditorProps } from "@/lib/props";
import { cn, isTypeText } from "@/lib/utils";
import {
   AlignCenter,
   AlignLeft,
   AlignRight,
   ArrowDownCircleIcon,
   ArrowUpCircleIcon,
   ChevronDown,
   EraserIcon,
   Trash,
} from "lucide-react";
import { useState } from "react";
import { BsBorderWidth } from "react-icons/bs";
import { FaBold, FaItalic, FaStrikethrough, FaUnderline } from "react-icons/fa";
import { FaRotateLeft, FaRotateRight } from "react-icons/fa6";
import { RxTransparencyGrid } from "react-icons/rx";
import { ToolFontSize } from "./tools/tool-fontsize";
import { TbColorFilter } from "react-icons/tb";
import { IoRemoveCircleOutline } from "react-icons/io5";

export const Toolbar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {
   const color = editor?.getFillColor() ?? "black";
   const strokeColor = editor?.getStrokeColor() ?? "black";
   const bold = editor?.getBold() || 400;
   const italic = editor?.getItalic() || "normal";
   const underline = editor?.getUnderline() || false;
   const linethrough = editor?.getLinethrough() || false;
   const align = editor?.getAlign() || "left";
   const fontSize = editor?.getFontSize() || 32;

   const selectedObject = editor?.selectedObject[0];
   const typeObject = selectedObject?.type;

   const isText = isTypeText(typeObject);
   const isImage = typeObject === "image";

   const [properties, setProperties] = useState({
      bold: bold,
      italic: italic,
      underline: underline,
      linethrough: linethrough,
      align: align,
      fontSize: fontSize,

      color: color,
      strokeColor: strokeColor,
   });

   const toggleBold = () => {
      if (!selectedObject) return null;
      if (editor) editor.changeBold();
      setProperties({
         ...properties,
         bold: properties.bold == 400 ? 700 : 400,
      });
   };
   const toogleItalic = () => {
      if (!selectedObject) return null;
      if (editor) editor.changeItalic();
      setProperties({
         ...properties,
         italic: properties.italic == "italic" ? "normal" : "italic",
      });
   };
   const toggleUnderline = () => {
      if (!selectedObject) return null;
      if (editor) editor.changeUnderline();
      setProperties({
         ...properties,
         underline: properties.underline == true ? false : true,
      });
   };
   const toggleLinethrough = () => {
      if (!selectedObject) return null;
      if (editor) editor.changeLinethrough();

      setProperties({
         ...properties,
         linethrough: properties.linethrough == true ? false : true,
      });
   };
   const setAlign = (value: string) => {
      if (!selectedObject) return null;
      if (editor) editor.changeAlign(value);

      setProperties({
         ...properties,
         align: value,
      });
   };
   const setRotate = (value: number) => {
      if (editor) {
         editor.changeRotate(value);
      }
   };
   const handleChangeFontSize = (value: number) => {
      if (!selectedObject) return null;
      if (editor) editor.changeFontSize(value);

      setProperties({
         ...properties,
         fontSize: value,
      });
   };

   if (editor?.selectedObject.length === 0) {
      return <div className="mx-4 h-[56px] z-[49] flex gap-x-2" />;
   }

   return (
      <div className="mx-4 h-[56px] z-[49] flex gap-x-2">
         <ScrollArea className="h-full whitespace-nowrap">
            <ScrollBar orientation="horizontal" />
            <div className="flex items-center justify-center w-[calc(100%-80px)] gap-x-2 pt-2 mr-20">
               {!isImage && (
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
                                 typeof properties.color === "string"
                                    ? properties.color
                                    : "black",
                           }}
                        />
                     </Button>
                  </Hint>
               )}
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
               {isText && (
                  <Hint label="Italic" side="bottom">
                     <Button
                        onClick={() => toogleItalic()}
                        variant="ghost"
                        size="icon"
                        className={cn(
                           "w-auto p-2",
                           properties.italic == "italic" && "bg-gray-100"
                        )}
                     >
                        <FaItalic />
                     </Button>
                  </Hint>
               )}
               {isText && (
                  <Hint label="Underline" side="bottom">
                     <Button
                        onClick={() => toggleUnderline()}
                        variant="ghost"
                        size="icon"
                        className={cn(
                           "w-auto p-2",
                           properties.underline && "bg-gray-100"
                        )}
                     >
                        <FaUnderline />
                     </Button>
                  </Hint>
               )}
               {isText && (
                  <Hint label="Strike Through" side="bottom">
                     <Button
                        onClick={() => toggleLinethrough()}
                        variant="ghost"
                        size="icon"
                        className={cn(
                           "w-auto p-2",
                           properties.linethrough && "bg-gray-100"
                        )}
                     >
                        <FaStrikethrough />
                     </Button>
                  </Hint>
               )}
               {isText && (
                  <Hint label="Align Left" side="bottom">
                     <Button
                        onClick={() => setAlign("left")}
                        variant="ghost"
                        size="icon"
                        className={cn(
                           "w-auto p-2",
                           properties.align == "left" && "bg-gray-100"
                        )}
                     >
                        <AlignLeft className="size-4" />
                     </Button>
                  </Hint>
               )}
               {isText && (
                  <Hint label="Align Center" side="bottom">
                     <Button
                        onClick={() => setAlign("center")}
                        variant="ghost"
                        size="icon"
                        className={cn(
                           "w-auto p-2",
                           properties.align == "center" && "bg-gray-100"
                        )}
                     >
                        <AlignCenter className="size-4" />
                     </Button>
                  </Hint>
               )}
               {isText && (
                  <Hint label="Align Right" side="bottom">
                     <Button
                        onClick={() => setAlign("right")}
                        variant="ghost"
                        size="icon"
                        className={cn(
                           "w-auto p-2",
                           properties.align == "right" && "bg-gray-100"
                        )}
                     >
                        <AlignRight className="size-4" />
                     </Button>
                  </Hint>
               )}
               {isText && (
                  <ToolFontSize
                     value={properties.fontSize}
                     onChange={handleChangeFontSize}
                  />
               )}
               {isImage && (
                  <Hint label="Filter" side="bottom">
                     <Button
                        onClick={() => setActiveTool("filter")}
                        variant="ghost"
                        size="icon"
                        className={cn(
                           "w-auto p-2",
                           activeTool == "filter" && "bg-gray-100"
                        )}
                     >
                        <TbColorFilter className="size-4" />
                     </Button>
                  </Hint>
               )}
               {isImage && (
                  <Hint label="Remove Background" side="bottom">
                     <Button
                        onClick={() => setActiveTool("remove-bg")}
                        variant="ghost"
                        size="icon"
                        className={cn(
                           "w-auto p-2",
                           activeTool == "remove-bg" && "bg-gray-100"
                        )}
                     >
                        <EraserIcon className="size-4" />
                     </Button>
                  </Hint>
               )}
               <Hint label="Rotate Left" side="bottom">
                  <Button
                     onClick={() => setRotate(-90)}
                     variant="ghost"
                     size="icon"
                     className="w-auto p-2"
                  >
                     <FaRotateLeft className="size-4" />
                  </Button>
               </Hint>
               <Hint label="Rotate Right" side="bottom">
                  <Button
                     onClick={() => setRotate(90)}
                     variant="ghost"
                     size="icon"
                     className="w-auto p-2"
                  >
                     <FaRotateRight className="size-4" />
                  </Button>
               </Hint>
               <Hint label="Bring to front" side="bottom">
                  <Button
                     onClick={() => editor?.bringToFront()}
                     variant="ghost"
                     size="icon"
                     className="p-2"
                  >
                     <ArrowUpCircleIcon className="size-5" />
                  </Button>
               </Hint>
               <Hint label="Send to Backwards" side="bottom">
                  <Button
                     onClick={() => editor?.sendToBack()}
                     variant="ghost"
                     size="icon"
                     className="p-2"
                  >
                     <ArrowDownCircleIcon className="size-5" />
                  </Button>
               </Hint>
               <Hint label="Opacity" side="bottom">
                  <Button
                     onClick={() => setActiveTool("opacity")}
                     variant="ghost"
                     size="icon"
                     className={cn(
                        "p-2",
                        activeTool == "opacity" && "bg-gray-100"
                     )}
                  >
                     <RxTransparencyGrid className="size-5" />
                  </Button>
               </Hint>
               <Hint label="Opacity" side="bottom">
                  <Button
                     onClick={() => editor?.delete()}
                     variant="ghost"
                     size="icon"
                     className="p-2"
                  >
                     <Trash className="size-5" />
                  </Button>
               </Hint>
            </div>
         </ScrollArea>
      </div>
   );
};
