import { TRectangleLayer } from "@/types/canvas";
import React from "react";

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
  const { x, y, width, height, fill } = layer;

  return (
    <rect
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      width={width}
      height={height}
      strokeWidth={1}
      fill={"#000"}
      stroke={selectionColor || "transparent"}
    />
  );
};
