import { useCallback, useEffect } from "react";
import { fabric } from "fabric";

export const UseAutoResize = ({
   canvas,
   container,
}: {
   canvas: fabric.Canvas | null;
   container: HTMLDivElement | null;
}) => {
   const autoZoom = useCallback(() => {
      if (!canvas || !container) return;

      const width = container.offsetWidth;
      const height = container.offsetHeight;

      canvas.setHeight(height);
      canvas.setWidth(width);

      const center = canvas.getCenter();
      const zoomRatio = 0.85;
      const lokalWorkspace = canvas
         .getObjects()
         .find((obj) => obj.name == "clip");

      //@ts-ignore
      const scale = fabric.util.findScaleToFit(lokalWorkspace, {
         width: width,
         height: height,
      });

      const zoom = zoomRatio * scale;

      canvas.setViewportTransform(fabric.iMatrix.concat());
      canvas.zoomToPoint(new fabric.Point(center.left, center.top), zoom);

      if (!lokalWorkspace) return;
      const workspaceCenter = lokalWorkspace.getCenterPoint();
      const viewTransform = canvas.viewportTransform;

      if (
         !viewTransform ||
         canvas.width === undefined ||
         canvas.height === undefined
      )
         return;

      viewTransform[4] =
         canvas.width / 2 - workspaceCenter.x * viewTransform[0];
      viewTransform[5] =
         canvas.height / 2 - workspaceCenter.y * viewTransform[3];

      canvas.setViewportTransform(viewTransform);
      lokalWorkspace.clone((cloned: fabric.Rect) => {
         canvas.clipPath = cloned;
         canvas.requestRenderAll();
      });
   }, [canvas, container]);

   useEffect(() => {
      let resize: ResizeObserver | null = null;

      if (canvas && container) {
         resize = new ResizeObserver(() => {
            autoZoom();
         });

         resize.observe(container);
      }

      return () => {
         if (resize) {
            resize.disconnect();
         }
      };
   }, [canvas, container, autoZoom]);

   return { autoZoom };
};
