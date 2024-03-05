"use client";
import { useMutation } from "@/liveblocks.config";
import { ECanvasMode, TCanvasState, TPoint } from "@/types/canvas";
import React, { SetStateAction } from "react";

type TTranslateSelectedLayers = (point: TPoint) => void;

interface IUseTranslateSelectedLayersReturn {
  translateSelectedLayers: TTranslateSelectedLayers;
}

export const useTranslateSelectedLayers = (
  setCanvasState: React.Dispatch<SetStateAction<TCanvasState>>,
  canvasState: TCanvasState,
): IUseTranslateSelectedLayersReturn => {
  const translateSelectedLayers = useMutation(
    ({ storage, self }, point: TPoint) => {
      if (canvasState.mode !== ECanvasMode.Translating) {
        return;
      }

      const offset = {
        x: point.x - canvasState.current.x,
        y: point.y - canvasState.current.y,
      };

      const liveLayers = storage.get("layers");

      for (const id of self.presence.selection) {
        const layer = liveLayers.get(id);

        if (layer) {
          layer.update({
            x: layer.get("x") + offset.x,
            y: layer.get("y") + offset.y,
          });
        }
      }

      setCanvasState({ mode: ECanvasMode.Translating, current: point });
    },
    [canvasState, setCanvasState],
  );

  return {
    translateSelectedLayers,
  };
};
