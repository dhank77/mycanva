import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import { ToolHeader } from "../tools/tool-header";
import { ToolClose } from "../tools/tool-close";
import { ScrollArea } from "@/components/ui/scroll-area";
import { filters } from "@/lib/types";
import { Button } from "@/components/ui/button";

export const FilterColorSidebar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {
   return (
      <aside
         className={cn(
            "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
            activeTool === "filter" ? "visible" : "hidden"
         )}
      >
         <ToolHeader title="Filter" description="Filter your images" />
         <ScrollArea>
            <div className="space-y-2 p-4">
               {filters.map((filter) => (
                  <Button
                     variant="secondary"
                     key={filter}
                     onClick={() => {
                        editor?.setFilter(filter);
                     }}
                     className={cn(
                        "w-full h-14 text-md justify-start capitalize",
                     )}
                  >
                     {filter}
                  </Button>
               ))}
            </div>
         </ScrollArea>

         <ToolClose onClick={() => setActiveTool("select")} />
      </aside>
   );
};
