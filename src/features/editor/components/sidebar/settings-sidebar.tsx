import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import React, { useEffect, useMemo, useState } from "react";
import { ToolHeader } from "../tools/tool-header";
import { ToolClose } from "../tools/tool-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ToolPickerColor } from "../tools/tool-picker-color";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const SettingsSidebar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {
   const wsp = editor?.lokalWorkspace();

   const { wspWidth, wspHeight, wspBackground } = useMemo(() => {
      return {
         wspWidth: `${wsp?.width ?? 0}`,
         wspHeight: `${wsp?.height ?? 0}`,
         wspBackground: wsp?.fill ?? "#ffffff",
      };
   }, [wsp]);

   const [properties, setProperties] = useState({
      background: "",
      width: "",
      height: "",
   });
   useEffect(() => {
      setProperties({
         background: wspBackground as string,
         width: wspWidth,
         height: wspHeight,
      });
   }, [wspWidth, wspHeight, wspBackground]);

   const changeColor = (value: string) => {
      if (editor) {
         editor.changeBackground(value);
         setProperties({
            ...properties,
            background: value,
         });
      }
   };

   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (editor) {
         editor.changeSize({
            width: parseInt(properties.width),
            height: parseInt(properties.height),
         });
      }
   };

   return (
      <aside
         className={cn(
            "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
            activeTool === "settings" ? "visible" : "hidden"
         )}
      >
         <ToolHeader
            title="Settings"
            description="Change your workspace settings"
         />
         <ScrollArea>
            <div>
               <form className="p-4" onSubmit={onSubmit}>
                  <div className="space-y-2">
                     <Label>Height</Label>
                     <Input
                        value={properties.height}
                        onChange={(e) =>
                           setProperties({
                              ...properties,
                              height: e.target.value,
                           })
                        }
                        name="height"
                        type="number"
                        className="w-full"
                     />
                  </div>
                  <div className="space-y-2">
                     <Label>Width</Label>
                     <Input
                        value={properties.width}
                        onChange={(e) =>
                           setProperties({
                              ...properties,
                              width: e.target.value,
                           })
                        }
                        name="width"
                        type="number"
                        className="w-full"
                     />
                  </div>
                  <Button className="w-full mt-2" type="submit">
                     Resize
                  </Button>
               </form>
            </div>
            <div className="space-y-6 p-4">
               <ToolPickerColor
                  value={properties.background}
                  onChange={changeColor}
               />
            </div>
         </ScrollArea>

         <ToolClose onClick={() => setActiveTool("select")} />
      </aside>
   );
};
