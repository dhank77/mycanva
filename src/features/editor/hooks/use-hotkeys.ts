import { useEvent } from "react-use";
import { fabric } from "fabric";

interface useHotKeysProps {
   canvas: fabric.Canvas | null;
   save: () => void;
   undo: () => void;
   redo: () => void;
   copy: () => void;
   paste: () => void;
}

export const useHotKeys = ({
   canvas,
   save,
   undo,
   redo,
   copy,
   paste,
}: useHotKeysProps) => {
   useEvent("keydown", (e) => {
      const isCtrlKey = e.ctrlKey || e.metaKey;
      const isBackSpace = e.key === "Backspace";
      const isInput = ["INPUT", "TEXTAREA"].includes(
         (e.target as HTMLElement).tagName
      );

      if (isInput) return;

      if (isBackSpace) {
         canvas?.remove(...canvas.getActiveObjects());
         canvas?.discardActiveObject();
      }

      if (isCtrlKey && e.key === "z") {
         e.preventDefault();
         undo();
      }
      if (isCtrlKey && e.key === "y") {
         e.preventDefault();
         redo();
      }
      if (isCtrlKey && e.key === "s") {
         e.preventDefault();
         save();
      }
      if (isCtrlKey && e.key === "c") {
         e.preventDefault();
         copy();
      }
      if (isCtrlKey && e.key === "v") {
         e.preventDefault();
         paste();
      }
   });
};
