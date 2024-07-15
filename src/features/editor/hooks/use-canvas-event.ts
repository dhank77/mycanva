import { fabric } from "fabric";
import { useEffect } from "react";

export const UseCanvasEvent = ({
   canvas,
   setSelectedObject,
}: {
   canvas: fabric.Canvas | null;
   setSelectedObject: (objects: fabric.Object[]) => void;
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
         });
      }

      return () => {
        if(canvas){
            canvas.off("selection:created");
            canvas.off("selection:updated");
            canvas.off("selection:cleared");
        }
      }
   }, [canvas]);
};
