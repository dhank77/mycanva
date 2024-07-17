import { ActiveToolEditorProps } from "@/lib/props";
import { cn } from "@/lib/utils";
import { ToolClose } from "../tools/tool-close";
import { ToolHeader } from "../tools/tool-header";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useGetImages } from "@/features/images/api/use-get-images";
import { AlertTriangle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { UploadButton } from "@/lib/uploadthing";
import { useCallback, useEffect, useState } from "react";

import { Basic } from "unsplash-js/dist/methods/photos/types";

export const ImagesSidebar = ({
   editor,
   activeTool,
   setActiveTool,
}: ActiveToolEditorProps) => {
   const { data, isLoading, isError } = useGetImages({activeTool});

   return (
      <aside
         className={cn(
            "relative w-[360px] z-[40] h-full bg-white border-r flex flex-col",
            activeTool === "image" ? "visible" : "hidden"
         )}
      >
         <ToolHeader title="Images" description="Add images to your canvas!" />
         <div className="p-4 border-b">
            <UploadButton
               appearance={{
                  button: "w-full text-sm font-medium",
                  allowedContent: "hidden",
               }}
               content={{
                  button: "Upload Image",
               }}
               endpoint="imageUploader"
               onClientUploadComplete={(image) => {
                  editor?.addImage(image[0].url);
               }}
            />
         </div>
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
            <div className="p-4 grid grid-cols-2 gap-4">
               {data &&
                  data.map((image) => (
                     <button
                        key={image.id}
                        className="relative w-full h-[100px] group rounded-sm overflow-hidden border transition hover:opacity-90"
                        onClick={() => editor?.addImage(image.urls.full)}
                     >
                        <Image
                           fill
                           className="object-cover"
                           src={image.urls.small}
                           alt={image.alt_description || "image"}
                        />
                        <Link
                           target="_blank"
                           className="opacity-0 group-hover:opacity-100 absolute left-0 bottom-0 w-full hover:underline bg-black/50 text-white text-left text-[10px] font-bold truncate p-1"
                           href={image.links.html}
                        >
                           {image.user.username}
                        </Link>
                     </button>
                  ))}
            </div>
         </ScrollArea>

         <ToolClose onClick={() => setActiveTool("select")} />
      </aside>
   );
};
