import { useCallback, useMemo, useState } from "react";
import { fabric } from "fabric";
import { UseAutoResize } from "./use-autoresize";
import { buildEditor } from "./build-editor";
import { UseCanvasEvent } from "./use-canvas-event";

export const useEditor = ({
   clearSelection
} :  {
   clearSelection?: () => void,
}) => {
   const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
   const [container, setContainer] = useState<HTMLDivElement | null>(null);

   // selected object
   const [selectedObject, setSelectedObject] = useState<fabric.Object[]>([]);
   const [fillColor, setFillColor] = useState<string>("black");
   const [strokeColor, setStrokeColor] = useState<string>("black");
   const [strokeWidth, setStrokeWidth] = useState<number>(1);

   UseAutoResize({
      canvas,
      container,
   });

   UseCanvasEvent({
      canvas,
      setSelectedObject,
      clearSelection
   });

   const editor = useMemo(() => {
      if (canvas) {
         return buildEditor({
            canvas,
            fillColor,
            strokeColor,
            strokeWidth,
            setFillColor,
            setStrokeColor,
            setStrokeWidth,
            selectedObject,
         });
      }

      return undefined;
   }, [
      canvas,
      fillColor,
      strokeColor,
      strokeWidth,
      setSelectedObject,
      setFillColor,
      setStrokeColor,
      setStrokeWidth,
      selectedObject
   ]);

   const init = useCallback(
      ({
         initialCanvas,
         initialContainer,
      }: {
         initialCanvas: fabric.Canvas;
         initialContainer: HTMLDivElement;
      }) => {
         fabric.Object.prototype.set({
            cornerColor: "#FFF",
            cornerStyle: "circle",
            borderColor: "#3b82f6",
            borderScaleFactor: 1.5,
            transparentCorners: false,
            borderOpacityWhenMoving: 1,
            cornerStrokeColor: "#3b82f6",
         });

         const initialWorkspace = new fabric.Rect({
            width: 900,
            height: 1200,
            name: "clip",
            fill: "white",
            selectable: false,
            hasControls: false,
            shadow: new fabric.Shadow({
               color: "rgba(0, 0, 0, 0.8)",
               blur: 5,
            }),
         });

         initialCanvas.setWidth(initialContainer.offsetWidth);
         initialCanvas.setHeight(initialContainer.offsetHeight);

         initialCanvas.add(initialWorkspace);
         initialCanvas.centerObject(initialWorkspace);
         initialCanvas.clipPath = initialWorkspace;

         setCanvas(initialCanvas);
         setContainer(initialContainer);
      },
      []
   );
   return { init, editor };
};
