import { useMutation } from "@/liveblocks.config";
import { ECanvasMode, TCanvasState, TPoint } from "@/types/canvas";
import { findIntersectingLayersWithRectangle } from "@/lib/utils/findIntersectingLayersWithRectangle";
import React, { SetStateAction } from "react";

interface IUseUpdateSelectionNetReturn {
  updateSelectionNet: (current: TPoint, origin: TPoint) => void;
}

export const useUpdateSelectionNet = (
  layerIds: readonly string[],
  setCanvasState: React.Dispatch<SetStateAction<TCanvasState>>,
): IUseUpdateSelectionNetReturn => {
  const updateSelectionNet = useMutation(
    ({ storage, setMyPresence }, current: TPoint, origin: TPoint) => {
      const layers = storage.get("layers").toImmutable();

      setCanvasState({
        mode: ECanvasMode.SelectionNet,
        origin,
        current,
      });

      const ids = findIntersectingLayersWithRectangle(
        layerIds,
        layers,
        origin,
        current,
      );

      setMyPresence({ selection: ids });
    },
    [layerIds],
  );
  return { updateSelectionNet };
};
