"use client";
import { useMutation, useSelf } from "@/liveblocks.config";
import {
  ECanvasMode,
  ELayerType,
  TCanvasState,
  TColor,
  TLayer,
  TPoint,
} from "@/types/canvas";
import {
  INITIAL_LAYER_FILL_OPACITY,
  INITIAL_LAYER_HEIGHT,
  INITIAL_LAYER_STROKE_COLOR,
  INITIAL_LAYER_STROKE_DASHARRAY,
  INITIAL_LAYER_STROKE_OPACITY,
  INITIAL_LAYER_STROKE_WIDTH,
  INITIAL_LAYER_WIDTH,
  MAX_LAYERS,
  MAX_LAYERS_ERROR,
  MULTI_SELECTION_TRIGGER_DISTANCE,
} from "@/lib/consts";
import { toast } from "sonner";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import React, { SetStateAction, useCallback } from "react";

type TInsertLayer = (
  layerType: Exclude<ELayerType, ELayerType.Path>,
  position: TPoint,
  setCanvasState: React.Dispatch<SetStateAction<TCanvasState>>,
  currentColor: TColor,
) => void;

type TStartMultiSelection = (
  current: TPoint,
  origin: TPoint,
  setCanvasState: React.Dispatch<SetStateAction<TCanvasState>>,
) => void;

interface IUseLayerActionsReturn {
  unselectLayers: () => void;
  deleteLayers: () => void;
  insertLayer: TInsertLayer;
  startMultiSelection: TStartMultiSelection;
}

export const useLayerActions = (): IUseLayerActionsReturn => {
  const selection = useSelf((me) => me.presence.selection);

  const deleteLayers = useMutation(
    ({ storage, setMyPresence }) => {
      const liveLayers = storage.get("layers");
      const liveLayerIds = storage.get("layerIds");

      for (const id of selection) {
        liveLayers.delete(id);

        const index = liveLayerIds.indexOf(id);

        if (index !== -1) liveLayerIds.delete(index);

        setMyPresence({ selection: [] }, { addToHistory: true });
      }
    },
    [selection],
  );

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: Exclude<ELayerType, ELayerType.Path>,
      position: TPoint,
      setCanvasState: React.Dispatch<SetStateAction<TCanvasState>>,
      currentColor: TColor,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        setCanvasState({ mode: ECanvasMode.None });
        toast.error(MAX_LAYERS_ERROR);
        return;
      }
      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer: LiveObject<TLayer> = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: INITIAL_LAYER_HEIGHT,
        width: INITIAL_LAYER_WIDTH,
        fill: currentColor,
        fillOpacity: INITIAL_LAYER_FILL_OPACITY,
        stroke: INITIAL_LAYER_STROKE_COLOR,
        strokeOpacity: INITIAL_LAYER_STROKE_OPACITY,
        strokeDasharray: INITIAL_LAYER_STROKE_DASHARRAY,
        strokeWidth: INITIAL_LAYER_STROKE_WIDTH,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: ECanvasMode.None });
    },
    [],
  );

  const unselectLayers = useMutation(({ self, setMyPresence }) => {
    if (self.presence.selection.length > 0)
      setMyPresence({ selection: [] }, { addToHistory: true });
  }, []);

  const startMultiSelection = useCallback(
    (
      current: TPoint,
      origin: TPoint,
      setCanvasState: React.Dispatch<SetStateAction<TCanvasState>>,
    ) => {
      if (
        Math.abs(current.x - origin.x) + Math.abs(current.y - origin.y) >
        MULTI_SELECTION_TRIGGER_DISTANCE
      ) {
        setCanvasState({
          mode: ECanvasMode.SelectionNet,
          origin,
          current,
        });
      }
    },
    [],
  );

  return {
    deleteLayers,
    insertLayer,
    unselectLayers,
    startMultiSelection,
  };
};
