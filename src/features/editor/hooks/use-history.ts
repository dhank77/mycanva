import { useCallback, useRef, useState } from "react";
import { fabric } from "fabric";

export const useHistory = ({ canvas }: { canvas: fabric.Canvas | null }) => {
   const [historyIndex, setHistoryIndex] = useState(0);
   const canvasHistory = useRef<string[]>([]);
   const skipSave = useRef(false);

   const canUndo = useCallback(() => {
      return historyIndex > 0;
   }, [historyIndex]);
   const canRedo = useCallback(() => {
      return historyIndex < canvasHistory.current.length - 1;
   }, [historyIndex]);

   const save = useCallback(() => {
      if (!canvas) return;

      const currentState = canvas.toJSON();
      const json = JSON.stringify(currentState);
   }, [canvas]);

   return { save };
};
