"use client";
import React, { memo } from "react";
import { useStorage } from "@/liveblocks.config";
import { ELayerType } from "@/types/canvas";
import { Rectangle } from "@/app/board/[boardId]/_components/canvasDrawable/Rectangle";
import { Ellipse } from "@/app/board/[boardId]/_components/canvasDrawable/Ellipse";
import { Text } from "@/app/board/[boardId]/_components/canvasDrawable/Text";
import { Note } from "@/app/board/[boardId]/_components/canvasDrawable/Note";
import { Path } from "@/app/board/[boardId]/_components/canvasDrawable/Path";
import { rgbToHex } from "@/lib/utils/rgbToHex";

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
      case ELayerType.Ellipse:
        return (
          <Ellipse
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case ELayerType.Text:
        return (
          <Text
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case ELayerType.Note:
        return (
          <Note
            id={id}
            layer={layer}
            onPointerDown={onLayerPointerDown}
            selectionColor={selectionColor}
          />
        );
      case ELayerType.Path:
        return (
          <Path
            selectionColor={selectionColor}
            key={id}
            points={layer.points}
            onPointerDown={(e) => onLayerPointerDown(e, id)}
            x={layer.x}
            y={layer.y}
            opacity={layer.fillOpacity}
            fill={rgbToHex(layer.fill)}
          />
        );
      default:
        console.warn("Unknown layer type");
        return null;
    }
  },
);

LayerPreview.displayName = "LayerPreview";
