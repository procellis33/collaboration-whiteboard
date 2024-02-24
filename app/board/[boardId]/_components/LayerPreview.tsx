"use client";
import React, { memo } from "react";
import { useStorage } from "@/liveblocks.config";
import { ELayerType } from "@/types/canvas";
import { Rectangle } from "@/app/board/[boardId]/_components/Rectangle";

interface ILayerPreviewProps {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

export const LayerPreview: React.FC<ILayerPreviewProps> = memo(
  ({ id, onLayerPointerDown, selectionColor }) => {
    const layer = useStorage((root) => root.layers.get(id));

    if (!layer) return null;

    switch (layer.type) {
      case ELayerType.Rectangle:
        return (
          <Rectangle
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      default:
        console.warn("Unknown layer type");
        return null;
    }
  },
);

LayerPreview.displayName = "LayerPreview";
