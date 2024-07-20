import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import { ToolClose } from "../tools/tool-close";
import { ToolHeader } from "../tools/tool-header";
import { Button } from "@/components/ui/button";
import { useRemoveBg } from "@/features/ai/api/use-remove-bg";
import Image from "next/image";
import { AlertTriangleIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

export const RemoveBgSidebar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {
   const selectedObject = editor?.selectedObject[0];
   //@ts-ignore
   const imageSrc = selectedObject?._originalElement?.currentSrc;

   const mutation = useRemoveBg();
   const onClick = () => {
      if (!selectedObject) return null;

      mutation.mutate(
         {
            image: imageSrc,
         },
         {
            onSuccess: ({ data }) => {
               editor.addImage(data);
            },
         }
      );
   };

   return (
      <aside
         className={cn(
            "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
            activeTool === "remove-bg" ? "visible" : "hidden"
         )}
      >
         <ToolHeader title="AI" description="Generate images from AI!" />
         {!imageSrc && (
            <div className="flex flex-col justify-center items-center h-full w-full p-4 text-center">
               <AlertTriangleIcon className="size-8 text-red-500" />
               <p className="text-sm font-semibold text-red-500">
                  This object cannot applied for this features!
               </p>
            </div>
         )}
         {imageSrc && (
            <ScrollArea>
               <div className="p-4 space-y-4">
                  <div
                     className={cn(
                        "relative aspect-square rounded-md overflow-hidden bg-muted",
                        mutation.isPending && "opacity-70"
                     )}
                  >
                     <Image
                        src={imageSrc}
                        fill
                        alt="image"
                        className="object-cover"
                     />
                  </div>
                  <Button
                     className="w-full"
                     type="submit"
                     onClick={onClick}
                     disabled={mutation.isPending}
                  >
                     Remove Background
                     {mutation.isPending && (
                        <span className="ml-2 animate-spin transition">⏳</span>
                     )}
                  </Button>
               </div>
            </ScrollArea>
         )}

         <ToolClose onClick={() => setActiveTool("select")} />
      </aside>
   );
};
