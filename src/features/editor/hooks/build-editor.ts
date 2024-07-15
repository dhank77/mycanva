import { fabric } from "fabric";
import { ShapeEditorProps } from "@/lib/props";

export const buildEditor = (canvas: fabric.Canvas): ShapeEditorProps => {
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
    addCircle: () => {
      const circle = new fabric.Circle({
        width: 100,
        height: 100,
        radius: 100,
        fill: "black",
        strokeWidth: 1,
        stroke: "black",
      });

      setCenterObject(circle);
    },
    addSquareRounded: () => {
      const square = new fabric.Rect({
        width: 170,
        height: 170,
        fill: "black",
        strokeWidth: 1,
        stroke: "black",
        rx: 20,
      });
      setCenterObject(square);
    },
    addSquare: () => {
        const square = new fabric.Rect({
            width: 170,
            height: 170,
            fill: "black",
            strokeWidth: 1,
            stroke: "black",
          });
          setCenterObject(square);
    },
    addTriangle: () => {
        const triangle = new fabric.Triangle({
            width: 170,
            height: 170,
            fill: "black",
            strokeWidth: 1,
            stroke: "black",
        })
        setCenterObject(triangle);
    },
    addTriangle180: () => {
        const triangle = new fabric.Triangle({
            width: 170,
            height: 170,
            fill: "black",
            strokeWidth: 1,
            stroke: "black",
            angle: 180,
        })
        setCenterObject(triangle);
    },
    addDiamond: () => {
        const diamond = new fabric.Rect({
            left: 100,
            top: 100,
            fill: 'black',
            width: 100,
            height: 100,
            angle: 45,
            rx: 20,
          });
        setCenterObject(diamond);
    },
  };
};
