"use client";

import { fabric } from "fabric";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEditor } from "../hooks/use-editor";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { Footer } from "./footer";
import { ActiveToolTypes } from "@/lib/types";
import { ShapeSidebar } from "./sidebar/shape-sidebar";

export const Editor = () => {
   const { init, editor } = useEditor();
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
            <main className="flex flex-col flex-1 bg-white overflow-auto">
               <Toolbar />
               <div className="flex-1 h-full bg-muted" ref={containerRef}>
                  <canvas ref={canvasRef} />
               </div>
               <Footer />
            </main>
         </div>
      </div>
   );
};
