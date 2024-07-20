import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import { ToolClose } from "../tools/tool-close";
import { ToolHeader } from "../tools/tool-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useGenerateImage } from "@/features/ai/api/use-generate-image";
import { useState } from "react";

export const AiSidebar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {
   const [text, setText] = useState("");
   const mutation = useGenerateImage();

   const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      mutation.mutate(
         {
            prompt: text,
         },
         {
            onSuccess: ({ data }) => {
               editor?.addImage(data);
            },
         }
      );
   };

   return (
      <aside
         className={cn(
            "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
            activeTool === "ai" ? "visible" : "hidden"
         )}
      >
         <ToolHeader title="AI" description="Generate images from AI!" />
         <form onSubmit={onSubmit} className="p-4 flex flex-col gap-y-4">
            <Textarea
               value={text}
               disabled={mutation.isPending}
               className="w-full"
               rows={10}
               placeholder="An astronaut riding a horse on mars, hd, dramatic lighting"
               onChange={(e) => setText(e.target.value)}
            />
            <Button 
               className="w-full" 
               type="submit"
               disabled={mutation.isPending}
            >
               Generate Image
               {mutation.isPending && <span className="ml-2 animate-spin transition">⏳</span>}
            </Button>
         </form>

         <ToolClose onClick={() => setActiveTool("select")} />
      </aside>
   );
};
