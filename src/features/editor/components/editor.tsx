"use client";

import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "../hooks/use-editor";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { Footer } from "./footer";
import { ActiveToolTypes, closeSideBarTools,  } from "@/lib/types";
import { ShapeSidebar } from "./sidebar/shape-sidebar";
import { FillColorSidebar } from "./toolbar/fill-color-sidebar";
import { BorderColorSidebar } from "./toolbar/border-color-sidebar";
import { BorderWidthSidebar } from "./toolbar/border-width-sidebar";
import { OpacitySidebar } from "./toolbar/opacity-sidebar";

export const Editor = () => {

    // activeTool
    const [activeTool, setActiveTool] = useState<ActiveToolTypes>("select");
    const onChangeActiveTool = useCallback(
       (tool: ActiveToolTypes) => {
          if (tool == activeTool) {
             return setActiveTool("select");
          }
 
          setActiveTool(tool);
       },
       [activeTool]
    );
 
    // hideSidebarNotSelection
    const clearSelection = useCallback(() => {
       if(closeSideBarTools.includes(activeTool)) {
          setActiveTool("select");
       }
    }, [activeTool]);

   const { init, editor } = useEditor({
      clearSelection : clearSelection,
   });
   const canvasRef = useRef(null);
   const containerRef = useRef<HTMLDivElement>(null);

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
         <Navbar activeTool={activeTool} setActiveTool={onChangeActiveTool} />
         <div className="flex absolute w-full flex-1 h-[calc(100%-68px)] top-[68px]">
            <Sidebar
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
            <ShapeSidebar
               editor={editor}
               activeTool={activeTool}
               setActiveTool={onChangeActiveTool}
            />
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
               <Footer />
            </main>
         </div>
      </div>
   );
};
