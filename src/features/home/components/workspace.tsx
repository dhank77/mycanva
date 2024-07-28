"use client";

import { fabric } from "fabric";
import { useEditor } from "@/features/editor/hooks/use-editor";
import { useEffect, useRef } from "react";
import { useGetCvJson } from "../api/use-get-cv-json";
import { ResponTypeProject } from "@/features/projects/api/use-get-project";

export const Workspace = ({
   initialData,
}: {
   initialData: ResponTypeProject["data"];
}) => {
   const canvasRef = useRef(null);
   const containerRef = useRef<HTMLDivElement>(null);

   const { init } = useEditor({
      initialJson: initialData.json ?? "",
      initialWidth: initialData.width ?? 0,
      initialHeight: initialData.height ?? 0,
      isShow: true,
   });

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
      <div className="h-screen bg-muted p-2" ref={containerRef}>
         <canvas ref={canvasRef} />
      </div>
   );
};
