import { useCallback, useMemo, useRef, useState } from "react";
import { fabric } from "fabric";
import { UseAutoResize } from "./use-autoresize";
import { buildEditor } from "./build-editor";
import { UseCanvasEvent } from "./use-canvas-event";
import { useHistory } from "./use-history";
import { JSON_KEYS } from "@/lib/types";
import { useHotKeys } from "./use-hotkeys";
import { useWindowEvent } from "./use-window-event";
import { useLoadState } from "./use-load-state";

export const useEditor = ({
   initialJson,
   initialWidth,
   initialHeight,
   clearSelection,
   saveCallback,
}: {
   initialJson?: string;
   initialWidth?: number;
   initialHeight?: number;
   clearSelection?: () => void;
   saveCallback?: (values: {
      json: string;
      width: number;
      height: number;
   }) => void;
}) => {

   const jsonRef = useRef(initialJson);
   const widthRef = useRef(initialWidth);
   const heightRef = useRef(initialHeight);

   const [canvas, setCanvas] = useState<fabric.Canvas | null>(null);
   const [container, setContainer] = useState<HTMLDivElement | null>(null);

   // selected object
   const [selectedObject, setSelectedObject] = useState<fabric.Object[]>([]);
   const [fillColor, setFillColor] = useState<string>("black");
   const [strokeColor, setStrokeColor] = useState<string>("black");
   const [strokeWidth, setStrokeWidth] = useState<number>(1);
   const [font, setFont] = useState<string>("Arial");

   useWindowEvent();

   const { autoZoom } = UseAutoResize({
      canvas,
      container,
   });

   const {
      save,
      redo,
      undo,
      canRedo,
      canUndo,
      canvasHistory,
      setHistoryIndex,
   } = useHistory({ canvas, saveCallback });

   UseCanvasEvent({
      save,
      canvas,
      setSelectedObject,
      clearSelection,
   });

   useHotKeys({
      canvas,
      save,
      undo,
      redo,
      copy: () => {}, //TODO : refactor editor onCopy
      paste: () => {}, //TODO : refactor editor onCopy
   });

   useLoadState({
      canvas,
      autoZoom,
      canvasHistory,
      setHistoryIndex,
      initialState : jsonRef,
   });

   const editor = useMemo(() => {
      if (canvas) {
         return buildEditor({
            save,
            undo,
            redo,
            canUndo,
            canRedo,
            autoZoom,
            canvas,
            fillColor,
            font,
            setFont,
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
      save,
      undo,
      redo,
      canUndo,
      canRedo,
      autoZoom,
      fillColor,
      font,
      strokeColor,
      strokeWidth,
      selectedObject,
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
            width: widthRef.current,
            height: heightRef.current,
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

         const currentState = JSON.stringify(initialCanvas.toJSON(JSON_KEYS));
         canvasHistory.current = [currentState];
         setHistoryIndex(0);
      },
      [canvasHistory, setHistoryIndex]
   );
   return { init, editor };
};
