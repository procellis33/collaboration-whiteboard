"use client";
import { useMutation } from "@/liveblocks.config";
import { ECanvasMode, TCanvasState, TPoint } from "@/types/canvas";
import { resizeBounds } from "@/lib/utils/resizeBounds";

type TResizeSelectedLayer = (point: TPoint) => void;

interface IResizeSelectedLayerReturn {
  resizeSelectedLayer: TResizeSelectedLayer;
}

export const useResizeSelectedLayer = (
  canvasState: TCanvasState,
): IResizeSelectedLayerReturn => {
  const resizeSelectedLayer = useMutation(
    ({ storage, self }, point: TPoint) => {
      if (canvasState.mode !== ECanvasMode.Resizing) return;

      const bounds = resizeBounds(
        canvasState.initialBounds,
        canvasState.corner,
        point,
      );

      const liveLayers = storage.get("layers");
      const layer = liveLayers.get(self.presence.selection[0]);

      if (layer) layer.update(bounds);
    },
    [canvasState],
  );

  return {
    resizeSelectedLayer,
  };
};
