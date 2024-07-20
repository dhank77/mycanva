import { fabric } from "fabric";
import { BuildEditorProps, EditorProps } from "@/lib/props";
import { createFilter, isTypeText } from "@/lib/utils";

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
   const lokalWorkspace = () => {
      return canvas.getObjects().find((obj) => obj.name == "clip");
   };

   const center = (object: fabric.Object) => {
      const workspace = lokalWorkspace();
      const centerPoint = workspace?.getCenterPoint();
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
            if (isTypeText(object.type)) {
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
            if (isTypeText(object.type)) {
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
            ...options,
         });
         setCenterObject(value);
      },
      addImage: (url) => {
         fabric.textureSize = 8000;
         fabric.Image.fromURL(
            url,
            (image) => {
               const workspace = lokalWorkspace();

               image.scaleToHeight(workspace?.height || 0);
               image.scaleToWidth(workspace?.width || 0);
               setCenterObject(image);
            },
            {
               crossOrigin: "anonymous",
            }
         );
      },
      setFilter: (filter) => {
         const objects = canvas.getActiveObjects();
         objects.forEach((object) => {
            if (object.type == "image") {
               const imageObject = object as fabric.Image;
               const effect = createFilter(filter);
               imageObject.filters = effect ? [effect] : [];
               imageObject.applyFilters();
               imageObject.set({
                  width: imageObject.width,
                  height: imageObject.height,
               });
               canvas.renderAll();
            }
         });
      },
      onCopy: () => {
         canvas.getActiveObjects().forEach((object) => {
            object.clone((cloneObj : any) => {
               canvas?.discardActiveObject();
               cloneObj.set({
                  left: cloneObj.left + 10,
                  top: cloneObj.top + 10,
                  eveted : true,
               })

               canvas.add(cloneObj);
               canvas.setActiveObject(cloneObj);
               canvas.requestRenderAll();
            })
         });
      },

      // value toolbar
      canvas,
      bringToFront: () => {
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            object.bringToFront();
         });

         canvas.renderAll();
         const workspace = lokalWorkspace();
         workspace?.sendToBack();
      },
      sendToBack: () => {
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            object.sendBackwards();
         });

         canvas.renderAll();
         const workspace = lokalWorkspace();
         workspace?.sendToBack();
      },

      changeBold: () => {
         //@ts-ignore
         const value = selected.get("fontWeight") || 400;
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if (isTypeText(object.type)) {
               if (value != 700) {
                  //@ts-ignore
                  object.set("fontWeight", 700);
               } else {
                  //@ts-ignore
                  object.set("fontWeight", 400);
               }
            }
         });
         canvas.renderAll();
      },
      getBold: () => {
         if (!selected) return 400;
         //@ts-ignore
         const value = selected.get("fontWeight") || 400;
         return value;
      },
      changeItalic: () => {
         //@ts-ignore
         const value = selected.get("fontStyle") || "normal";
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if (isTypeText(object.type)) {
               if (value == "normal") {
                  //@ts-ignore
                  object.set("fontStyle", "italic");
               } else {
                  //@ts-ignore
                  object.set("fontStyle", "normal");
               }
            }
         });
         canvas.renderAll();
      },
      getItalic: () => {
         if (!selected) return "normal";
         //@ts-ignore
         const value = selected.get("fontStyle") || "normal";
         return value;
      },
      changeUnderline: () => {
         //@ts-ignore
         const value = selected.get("underline") || false;
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if (isTypeText(object.type)) {
               if (!value) {
                  //@ts-ignore
                  object.set("underline", true);
               } else {
                  //@ts-ignore
                  object.set("underline", false);
               }
            }
         });
         canvas.renderAll();
      },
      getUnderline: () => {
         if (!selected) return false;
         //@ts-ignore
         const value = selected.get("underline") || false;
         return value;
      },
      changeLinethrough: () => {
         //@ts-ignore
         const value = selected.get("linethrough") || false;
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if (isTypeText(object.type)) {
               if (!value) {
                  //@ts-ignore
                  object.set("linethrough", true);
               } else {
                  //@ts-ignore
                  object.set("linethrough", false);
               }
            }
         });
         canvas.renderAll();
      },
      getLinethrough: () => {
         if (!selected) return false;
         //@ts-ignore
         const value = selected.get("linethrough") || false;
         return value;
      },
      changeAlign: (align) => {
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if (isTypeText(object.type)) {
               //@ts-ignore
               object.set("textAlign", align);
            }
         });
         canvas.renderAll();
      },
      getAlign: () => {
         if (!selected) return "left";
         //@ts-ignore
         const value = selected.get("textAlign") || "left";
         return value;
      },
      changeFontSize: (size) => {
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            if (isTypeText(object.type)) {
               //@ts-ignore
               object.set("fontSize", size);
            }
         });
         canvas.renderAll();
      },
      getFontSize: () => {
         if (!selected) return 32;
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
         if (!selected) return fillColor;
         const value = selected.fill || fillColor;
         return value as string;
      },
      getStrokeColor: () => {
         if (!selected) return strokeColor;
         const value = selected.stroke || strokeColor;
         return value as string;
      },
      getStrokeWidth: () => {
         if (!selected) return strokeWidth;
         const value = selected.strokeWidth || strokeWidth;
         return value;
      },
      getFont: () => {
         if (!selected) return font;
         //@ts-ignore
         const value = selected.get("fontFamily") || font;
         return value;
      },
      delete: () => {
         canvas.getActiveObjects().forEach((object: fabric.Object) => {
            canvas.remove(object);
         });
         canvas.discardActiveObject();
         canvas.renderAll();
      },
      selectedObject,
   };
};
