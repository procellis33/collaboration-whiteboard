import { useMutation } from "@/liveblocks.config";
import { ECanvasMode, TCanvasState, TColor, TPoint } from "@/types/canvas";
import React, { SetStateAction } from "react";
import { MAX_LAYERS } from "@/lib/consts";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { penPointsToPathLayer } from "@/lib/utils/penPointsToPathLayer";

interface IUseDrawingReturn {
  continueDrawing: (point: TPoint, e: React.PointerEvent) => void;
  insertPath: () => void;
  startDrawing: (point: TPoint, pressure: number) => void;
}

export const useDrawing = (
  canvasState: TCanvasState,
  setCanvasState: React.Dispatch<SetStateAction<TCanvasState>>,
  currentColor: TColor,
): IUseDrawingReturn => {
  const continueDrawing = useMutation(
    ({ self, setMyPresence }, point: TPoint, e: React.PointerEvent) => {
      const { pencilDraft } = self.presence;

      if (
        canvasState.mode !== ECanvasMode.Pencil ||
        e.buttons !== 1 ||
        pencilDraft == null
      ) {
        return;
      }

      setMyPresence({
        cursor: point,
        pencilDraft:
          pencilDraft.length === 1 &&
          pencilDraft[0][0] === point.x &&
          pencilDraft[0][1] === point.y
            ? pencilDraft
            : [...pencilDraft, [point.x, point.y, e.pressure]],
      });
    },
    [canvasState.mode],
  );

  const insertPath = useMutation(
    ({ storage, self, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const { pencilDraft } = self.presence;

      if (
        pencilDraft == null ||
        pencilDraft.length < 2 ||
        liveLayers.size >= MAX_LAYERS
      ) {
        setMyPresence({ pencilDraft: null });
        return;
      }

      const id = nanoid();
      liveLayers.set(
        id,
        new LiveObject(penPointsToPathLayer(pencilDraft, currentColor)),
      );

      const liveLayerIds = storage.get("layerIds");
      liveLayerIds.push(id);

      setMyPresence({ pencilDraft: null });
      setCanvasState({ mode: ECanvasMode.Pencil });
    },
    [currentColor],
  );

  const startDrawing = useMutation(
    ({ setMyPresence }, point: TPoint, pressure: number) => {
      setMyPresence({
        pencilDraft: [[point.x, point.y, pressure]],
        penColor: currentColor,
      });
    },
    [currentColor],
  );

  return { startDrawing, continueDrawing, insertPath };
};
