import { useCallback, useRef, useState } from "react";
import { fabric } from "fabric";
import { JSON_KEYS } from "@/lib/types";

export const useHistory = ({
   canvas,
   saveCallback,
}: {
   canvas: fabric.Canvas | null;
   saveCallback?: (values: {
      json: string;
      width: number;
      height: number;
   }) => void;
}) => {
   const [historyIndex, setHistoryIndex] = useState(0);
   const canvasHistory = useRef<string[]>([]);
   const skipSave = useRef(false);

   const canUndo = useCallback(() => {
      return historyIndex > 0;
   }, [historyIndex]);

   const canRedo = useCallback(() => {
      return historyIndex < canvasHistory.current.length - 1;
   }, [historyIndex]);

   const save = useCallback(
      (skip = false) => {
         if (!canvas) return;

         const currentState = canvas.toJSON(JSON_KEYS);
         const json = JSON.stringify(currentState);

         if (skip || skipSave.current) return;

         if (!skip && !skipSave.current) {
            canvasHistory.current.push(json);
            setHistoryIndex(canvasHistory.current.length - 1);
         }

         const workSpace = canvas
            .getObjects()
            .find((obj) => obj.name == "clip");
         const width = workSpace?.width ?? 0;
         const height = workSpace?.height ?? 0;

         saveCallback?.({
            json,
            width,
            height,
         });
      },
      [canvas, saveCallback]
   );

   const undo = useCallback(() => {
      if (canUndo()) {
         skipSave.current = true;
         canvas?.clear().renderAll();

         canvas?.loadFromJSON(
            JSON.parse(canvasHistory.current[historyIndex - 1]),
            () => {
               canvas.renderAll();
               setHistoryIndex(historyIndex - 1);
               skipSave.current = false;
            }
         );
      }
   }, [canvas, canUndo, historyIndex]);

   const redo = useCallback(() => {
      if (!canvas) return;
      if (canRedo()) {
         skipSave.current = true;
         canvas?.clear().renderAll();

         canvas?.loadFromJSON(
            JSON.parse(canvasHistory.current[historyIndex + 1]),
            () => {
               canvas.renderAll();
               setHistoryIndex(historyIndex + 1);
               skipSave.current = false;
            }
         );
      }
   }, [canvas, canRedo, historyIndex]);

   return {
      save,
      undo,
      redo,
      canRedo,
      canUndo,
      setHistoryIndex,
      canvasHistory,
   };
};
