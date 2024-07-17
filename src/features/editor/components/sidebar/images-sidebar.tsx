import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import { ToolClose } from "../tools/tool-close";
import { ToolHeader } from "../tools/tool-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetImages } from "@/features/images/api/use-get-images";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const ImagesSidebar = ({
  editor,
  activeTool,
  setActiveTool,
}: ActiveToolEditorProps) => {
  const { data, isLoading, isError } = useGetImages();
  return (
    <aside
      className={cn(
        "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
        activeTool === "image" ? "visible" : "hidden"
      )}
    >
      <ToolHeader title="Images" description="Add images to your canvas!" />
      {isLoading && (
        <div className="flex items-center justify-center">
          <Loader2 className="size-12 animate-spin" />
        </div>
      )}
      {isError && (
        <div className="flex items-center justify-center">
          <p>
            <AlertTriangle className="size-4" />
            <span>Failed to fetch data</span>
          </p>
        </div>
      )}
      <ScrollArea>
        <div className="grid grid-cols-2 gap-4 p-4">
          {data?.map((image) => (
            <></>
          ))}
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {}}
          >
            <Image 
              src="/next.svg"
              width="200"
              height="200"
              alt="logo"
            />.
          </Button>
          <Button
            variant="outline"
            className="w-full"
            onClick={() => {}}
          >
            <Image 
              src="/next.svg"
              width="200"
              height="200"
              alt="logo"
            />.
          </Button>
        </div>
      </ScrollArea>

      <ToolClose onClick={() => setActiveTool("select")} />
    </aside>
  );
};
