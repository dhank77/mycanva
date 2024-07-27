"use client";

import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "../hooks/use-editor";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { Footer } from "./footer";
import { ActiveToolTypes, closeSideBarTools } from "@/lib/types";
import { ShapeSidebar } from "./sidebar/shape-sidebar";
import { FillColorSidebar } from "./toolbar/fill-color-sidebar";
import { BorderColorSidebar } from "./toolbar/border-color-sidebar";
import { BorderWidthSidebar } from "./toolbar/border-width-sidebar";
import { OpacitySidebar } from "./toolbar/opacity-sidebar";
import { TextSidebar } from "./sidebar/text-sidebar";
import { FontSidebar } from "./toolbar/font-sidebar";
import { ImagesSidebar } from "./sidebar/images-sidebar";
import { FilterColorSidebar } from "./toolbar/filter-color-sidebar";
import { AiSidebar } from "./sidebar/ai-sidebar";
import { RemoveBgSidebar } from "./toolbar/remove-bg-sidebar";
import { DrawSidebar } from "./sidebar/draw-sidebar";
import { SettingsSidebar } from "./sidebar/settings-sidebar";
import { ResponTypeProject } from "@/features/projects/api/use-get-project";
import { useUpdateProject } from "@/features/projects/api/use-update-project";

export const Editor = ({
   initialData,
}: {
   initialData: ResponTypeProject["data"];
}) => {
   const { mutate } = useUpdateProject(initialData.id);

   const debounceUpdate = useCallback(
      (values: { json: string; width: number; height: number, }) => {
         mutate(values);
      },
      [mutate]
   );

   const [activeTool, setActiveTool] = useState<ActiveToolTypes>("select");
   // hideSidebarNotSelection
   const clearSelection = useCallback(() => {
      if (closeSideBarTools.includes(activeTool)) {
         setActiveTool("select");
      }
   }, [activeTool]);

   const { init, editor } = useEditor({
      initialJson: initialData.json ?? "",
      initialWidth: initialData.width,
      initialHeight: initialData.height,
      clearSelection: clearSelection,
      saveCallback: debounceUpdate,
   });
   const canvasRef = useRef(null);
   const containerRef = useRef<HTMLDivElement>(null);

   // activeTool
   const onChangeActiveTool = useCallback(
      (tool: ActiveToolTypes) => {
         if (tool == "draw") {
            editor?.enableDrawMode();
         }

         if (activeTool == "draw") {
            editor?.disableDrawMode();
         }

         if (tool == activeTool) {
            return setActiveTool("select");
         }

         setActiveTool(tool);
      },
      [activeTool, editor]
   );

   useEffect(() => {
      const canvas = new fabric.Canvas(canvasRef.current, {
         controlsAboveOverlay: true,
         preserveObjectStacking: true,
      });

      init({
         initialCanvas: canvas,
         initialContainer: containerRef.current!,
      });

      return () => {
         canvas.dispose();
      };
   }, [init]);

   return (
      <div className="h-full flex flex-col">
         <Navbar
            id={initialData.id}
            editor={editor}
            activeTool={activeTool}
            setActiveTool={onChangeActiveTool}
         />
         <div className="flex absolute w-full flex-1 h-[calc(100%-68px)] top-[68px]">
            <Sidebar
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            {/* sidebar item */}
            <ShapeSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            <TextSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            <ImagesSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            <AiSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            <DrawSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            <SettingsSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />

            {/* toolbar item */}
            <FillColorSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            <BorderColorSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            <BorderWidthSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            <OpacitySidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            <FontSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            <FilterColorSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            <RemoveBgSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />

            <main className="flex flex-col flex-1 bg-white overflow-auto">
               <Toolbar
                  editor={editor}
                  activeTool={activeTool}
                  setActiveTool={onChangeActiveTool}
                  key={JSON.stringify(editor?.canvas.getActiveObject())}
               />
               <div className="flex-1 h-full bg-muted" ref={containerRef}>
                  <canvas ref={canvasRef} />
               </div>
               <Footer editor={editor} />
            </main>
         </div>
      </div>
   );
};
