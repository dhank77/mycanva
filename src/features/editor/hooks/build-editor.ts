import { fabric } from "fabric";
import { BuildEditorProps, EditorProps } from "@/lib/props";
import { isTypeText } from "@/lib/utils";

export const buildEditor = ({
   canvas,
   fillColor,
   strokeColor,
   strokeWidth,
   setFillColor,
   setStrokeColor,
   setStrokeWidth,
   selectedObject,
}: BuildEditorProps): EditorProps => {
   const center = (object: fabric.Object) => {
      const lokalWorkspace = canvas
         .getObjects()
         .find((obj) => obj.name == "clip");

      const centerPoint = lokalWorkspace?.getCenterPoint();

      if (!centerPoint) return;

      //@ts-ignore
      canvas._centerObject(object, centerPoint);
   };

   const setCenterObject = (object: fabric.Object) => {
      center(object);
      canvas.add(object);
      canvas.setActiveObject(object);
   };

   return {
      changeFillColor: (color: string) => {
         setFillColor(color);
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            object.set("fill", color);
         });
         canvas.renderAll();
      },
      changeStrokeColor: (color: string) => {
         setStrokeColor(color);
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if(isTypeText(object.type)){
               object.set("fill", color);
            }
            
            object.set("stroke", color);
         });
         canvas.renderAll();
      },
      changeStrokeWidth: (width: number) => {
         setStrokeWidth(width);

         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            object.set("strokeWidth", width);
         });
         canvas.renderAll();
      },
      addCircle: () => {
         const circle = new fabric.Circle({
            width: 100,
            height: 100,
            radius: 100,
            fill: fillColor ?? "black",
            strokeWidth: strokeWidth ?? 1,
            stroke: strokeColor ?? "black",
         });

         setCenterObject(circle);
      },
      addSquareRounded: () => {
         const square = new fabric.Rect({
            width: 170,
            height: 170,
            fill: fillColor ?? "black",
            strokeWidth: strokeWidth ?? 1,
            stroke: strokeColor ?? "black",
            rx: 20,
         });
         setCenterObject(square);
      },
      addSquare: () => {
         const square = new fabric.Rect({
            width: 170,
            height: 170,
            fill: fillColor ?? "black",
            strokeWidth: strokeWidth ?? 1,
            stroke: strokeColor ?? "black",
         });
         setCenterObject(square);
      },
      addTriangle: () => {
         const triangle = new fabric.Triangle({
            width: 170,
            height: 170,
            fill: fillColor ?? "black",
            strokeWidth: strokeWidth ?? 1,
            stroke: strokeColor ?? "black",
         });
         setCenterObject(triangle);
      },
      addTriangle180: () => {
         const triangle = new fabric.Triangle({
            width: 170,
            height: 170,
            fill: fillColor ?? "black",
            strokeWidth: strokeWidth ?? 1,
            stroke: strokeColor ?? "black",
            angle: 180,
         });
         setCenterObject(triangle);
      },
      addDiamond: () => {
         const diamond = new fabric.Rect({
            left: 100,
            top: 100,
            fill: fillColor ?? "black",
            width: 100,
            height: 100,
            angle: 45,
            rx: 20,
         });
         setCenterObject(diamond);
      },
      
      // value
      canvas,
      getFillColor: () => {
         const selected = selectedObject[0];
         if(!selected) return fillColor;
         const value = selected.fill || fillColor;
         return value as string;
      },
      getStrokeColor: () => {
         const selected = selectedObject[0];
         if(!selected) return strokeColor;
         const value = selected.stroke || strokeColor;
         return value as string;
      },
      strokeWidth,
      selectedObject,
   };
};
