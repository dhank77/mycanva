import { UseLoadStateProps } from "@/lib/props";
import { JSON_KEYS } from "@/lib/types";
import { useEffect, useRef } from "react";

export const useLoadState = ({
   initialState,
   canvas,
   autoZoom,
   canvasHistory,
   setHistoryIndex,
}: UseLoadStateProps) => {
   const intialized = useRef(false);

   useEffect(() => {
      if (!intialized.current && initialState?.current && canvas) {
         const currentState = JSON.parse(initialState.current);
         canvas.loadFromJSON(currentState, () => {
            const dataJson = JSON.stringify(canvas.toJSON(JSON_KEYS));

            canvasHistory.current = [dataJson];
            setHistoryIndex(0);
            autoZoom();
         });
         intialized.current = true;
      }
   }, [canvas, initialState]);
};
