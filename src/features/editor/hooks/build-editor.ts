import { fabric } from "fabric";
import { BuildEditorProps, EditorProps } from "@/lib/props";
import { isTypeText } from "@/lib/utils";

export const buildEditor = ({
   canvas,
   font,
   fillColor,
   strokeColor,
   strokeWidth,
   setFont,
   setFillColor,
   setStrokeColor,
   setStrokeWidth,
   selectedObject,
}: BuildEditorProps): EditorProps => {
   const lokalWorkspace = canvas
         .getObjects()
         .find((obj) => obj.name == "clip");

   const center = (object: fabric.Object) => {
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

   const selected = selectedObject[0];

   return {
      changeOpacity: (opacity: number) => {
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            object.set("opacity", opacity);
         });

         canvas.renderAll();
      },
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
      changeFont: (value: string) => {
         setFont(value);
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if(isTypeText(object.type)){
               //@ts-ignore
               object.set("fontFamily", value);
            }
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
            strokeWidth: strokeWidth ?? 10,
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
      addTextbox: (text, options) => {
         const value = new fabric.Textbox(text, {
            type: "textbox",
            width: 250,
            ...options
         })
         setCenterObject(value);
      },
      
      // value toolbar
      canvas,
      bringToFront: () => {
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            object.bringToFront();
         })

         canvas.renderAll();
         lokalWorkspace?.sendToBack();
      },
      sendToBack: () => {
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            object.sendBackwards(); 
         })

         canvas.renderAll();
         lokalWorkspace?.sendToBack();
      },

      changeBold: () => {
         //@ts-ignore
         const value = selected.get("fontWeight") || 400;
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if(isTypeText(object.type)){
               if(value != 700){
                  //@ts-ignore
                  object.set("fontWeight", 700);
               }else{
                  //@ts-ignore
                  object.set("fontWeight", 400);
               }
            }
         });
         canvas.renderAll();
      },
      getBold: () => {
         if(!selected) return 400;
         //@ts-ignore
         const value = selected.get("fontWeight") || 400;
         return value;
      },
      changeItalic: () => {
         //@ts-ignore
         const value = selected.get("fontStyle") || "normal";
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if(isTypeText(object.type)){
               if(value == "normal"){
                  //@ts-ignore
                  object.set("fontStyle", "italic");
               }else{
                  //@ts-ignore
                  object.set("fontStyle", "normal");
               }
            }
         });
         canvas.renderAll();
      },
      getItalic: () => {
         if(!selected) return "normal";
         //@ts-ignore
         const value = selected.get("fontStyle") || "normal";
         return value;
      },
      changeUnderline: () => {
         //@ts-ignore
         const value = selected.get("underline") || false;
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if(isTypeText(object.type)){
               if(!value){
                  //@ts-ignore
                  object.set("underline", true);
               }else{
                  //@ts-ignore
                  object.set("underline", false);
               }
            }
         });
         canvas.renderAll();
      },
      getUnderline: () => {
         if(!selected) return false;
         //@ts-ignore
         const value = selected.get("underline") || false;
         return value;
      },
      changeLinethrough: () => {
         //@ts-ignore
         const value = selected.get("linethrough") || false;
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if(isTypeText(object.type)){
               if(!value){
                  //@ts-ignore
                  object.set("linethrough", true);
               }else{
                  //@ts-ignore
                  object.set("linethrough", false);
               }
            }
         });
         canvas.renderAll();
      },
      getLinethrough: () => {
         if(!selected) return false;
         //@ts-ignore
         const value = selected.get("linethrough") || false;
         return value;
      },
      changeAlign: (align) => {
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if(isTypeText(object.type)){
               //@ts-ignore
               object.set("textAlign", align);
            }
         });
         canvas.renderAll();
      },
      getAlign: () => {
         if(!selected) return "left";
         //@ts-ignore
         const value = selected.get("textAlign") || "left";
         return value;
      },
      changeFontSize: (size) => {
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if(isTypeText(object.type)){
               //@ts-ignore
               object.set("fontSize", size);
            }
         });
         canvas.renderAll();
      },
      getFontSize: () => {
         if(!selected) return 32;
         //@ts-ignore
         const value = selected.get("fontSize") || 32;
         return value;
      },
      changeRotate: (deg) => {
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            const angleNow = object.get("angle") || 0;
            object.set("angle", angleNow + deg);
         });
         canvas.renderAll();
      },

      getFillColor: () => {
         if(!selected) return fillColor;
         const value = selected.fill || fillColor;
         return value as string;
      },
      getStrokeColor: () => {
         if(!selected) return strokeColor;
         const value = selected.stroke || strokeColor;
         return value as string;
      },
      getStrokeWidth: () => {
         if(!selected) return strokeWidth;
         const value = selected.strokeWidth || strokeWidth;
         return value;
      },
      getFont: () => {
         if(!selected) return font;
         //@ts-ignore
         const value = selected.get("fontFamily") || font;
         return value;
      },
      delete: () => {
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            canvas.remove(object);
         })
         canvas.discardActiveObject();
         canvas.renderAll();
      },
      selectedObject,
   };
};
