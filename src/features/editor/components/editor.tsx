"use client";

import { fabric } from "fabric";
import { useEffect, useRef } from "react";
import { useEditor } from "../hooks/use-editor";
import { Navbar } from "./navbar";
import { Sidebar } from "./sidebar";
import { Toolbar } from "./toolbar";
import { Footer } from "./footer";

export const Editor = () => {
   const { init } = useEditor();
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
   }, [init]);

   return (
      <div className="h-full flex flex-col">
         <Navbar />
         <div className="flex w-full h-[calc(100%-68px)]">
            <Sidebar />
            <main className="flex flex-col flex-1 bg-white">
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
