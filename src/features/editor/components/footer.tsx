import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { EditorProps } from "@/lib/props";
import { Minimize, ZoomInIcon, ZoomOutIcon } from "lucide-react";

export const Footer = ({ editor }: { editor: EditorProps | undefined }) => {
   return (
      <div className="w-full h-[52px] flex justify-end items-center gap-x-2 pr-6">
         <Hint label="Reset" side="top">
            <Button
               onClick={() => editor?.resetSize()}
               variant="ghost"
               size="icon"
               className="h-full"
            >
               <Minimize className="size-6" />
            </Button>
         </Hint>
         <Hint label="Zoom in" side="top">
            <Button
               onClick={() => editor?.zoomIn()}
               variant="ghost"
               size="icon"
               className="h-full"
            >
               <ZoomInIcon className="size-6" />
            </Button>
         </Hint>
         <Hint label="Zoom out" side="top">
            <Button
               onClick={() => editor?.zoomOut()}
               variant="ghost"
               size="icon"
               className="h-full"
            >
               <ZoomOutIcon className="size-6" />
            </Button>
         </Hint>
      </div>
   );
};
