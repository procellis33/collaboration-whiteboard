import React from "react";
import { getSvgPathFromStroke } from "@/lib/utils/getSvgPathFromStroke";
import { getStroke } from "perfect-freehand";

interface IPathProps {
  x: number;
  y: number;
  points: number[][];
  onPointerDown?: (e: React.PointerEvent) => void;
  fill: string;
  opacity?: number;
  selectionColor?: string;
}

export const Path: React.FC<IPathProps> = ({
  x,
  y,
  points,
  onPointerDown,
  fill,
  opacity,
  selectionColor,
}) => {
  return (
    <path
      className={"drop-shadow-md cursor-pointer bg-muted"}
      onPointerDown={onPointerDown}
      d={getSvgPathFromStroke(
        getStroke(points, {
          size: 16,
          thinning: 0.5,
          smoothing: 0.5,
          streamline: 0.5,
        }),
      )}
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
      x={0}
      y={0}
      strokeWidth={1}
      stroke={selectionColor}
      fill={fill}
      opacity={opacity}
    />
  );
};
