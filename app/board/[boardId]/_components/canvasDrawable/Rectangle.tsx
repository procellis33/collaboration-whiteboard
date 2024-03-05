import { TRectangleLayer } from "@/types/canvas";
import React from "react";
import { rgbToHex } from "@/lib/utils/rgbToHex";
import { INITIAL_LAYER_STROKE_COLOR } from "@/lib/consts";

interface IRectangleProps {
  id: string;
  layer: TRectangleLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Rectangle: React.FC<IRectangleProps> = ({
  id,
  selectionColor,
  layer,
  onPointerDown,
}) => {
  const {
    x,
    y,
    width,
    height,
    fill,
    fillOpacity,
    strokeOpacity,
    stroke,
    strokeDasharray,
    strokeWidth,
  } = layer;

  return (
    <>
      {strokeOpacity !== 0 && (
        <rect
          style={{
            transform: `translate(${x}px, ${y}px)`,
          }}
          x={0}
          y={0}
          width={width}
          height={height}
          strokeWidth={strokeWidth}
          fillOpacity={0}
          strokeDasharray={strokeDasharray}
          strokeOpacity={strokeOpacity}
          stroke={rgbToHex(stroke || INITIAL_LAYER_STROKE_COLOR)}
        />
      )}
      <rect
        className="drop-shadow-md cursor-all-scroll"
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
          transform: `translate(${x}px, ${y}px)`,
        }}
        x={0}
        y={0}
        width={width}
        height={height}
        strokeWidth={1}
        fillOpacity={fillOpacity}
        fill={rgbToHex(fill)}
        stroke={selectionColor || "transparent"}
      />
    </>
  );
};
