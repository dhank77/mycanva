import { fabric } from "fabric";
import { useEffect } from "react";

export const UseCanvasEvent = ({
   save,
   canvas,
   setSelectedObject,
   clearSelection,
}: {
   save: () => void;
   canvas: fabric.Canvas | null;
   setSelectedObject: (objects: fabric.Object[]) => void;
   clearSelection?: () => void;
}) => {
   useEffect(() => {
      if (canvas) {
         canvas.on("object:added", () => save());
         canvas.on("object:removed", () => save());
         canvas.on("object:modified", () => save());
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
            canvas.off("object:added");
            canvas.off("object:removed");
            canvas.off("object:modified");
            canvas.off("selection:created");
            canvas.off("selection:updated");
            canvas.off("selection:cleared");
        }
      }
   }, [canvas, clearSelection]);
};
