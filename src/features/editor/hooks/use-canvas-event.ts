import { fabric } from "fabric";
import { useEffect } from "react";

export const UseCanvasEvent = ({
   canvas,
   setSelectedObject,
   clearSelection,
}: {
   canvas: fabric.Canvas | null;
   setSelectedObject: (objects: fabric.Object[]) => void;
   clearSelection?: () => void;
}) => {
   useEffect(() => {
      if (canvas) {
         canvas.on("selection:created", (e) => {
            setSelectedObject(e.selected || []);
         });
         canvas.on("selection:updated", (e) => {
            setSelectedObject(e.selected || []);
         });
         canvas.on("selection:cleared", () => {
            setSelectedObject([]);
            clearSelection?.();
         });
      }

      return () => {
        if(canvas){
            canvas.off("selection:created");
            canvas.off("selection:updated");
            canvas.off("selection:cleared");
        }
      }
   }, [canvas, clearSelection]);
};
