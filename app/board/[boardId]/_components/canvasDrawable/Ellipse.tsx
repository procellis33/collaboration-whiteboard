import { TEllipseLayer } from "@/types/canvas";
import React from "react";
import { rgbToHex } from "@/lib/utils/rgbToHex";
import { INITIAL_LAYER_STROKE_COLOR } from "@/lib/consts";

interface IEllipseProps {
  id: string;
  layer: TEllipseLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Ellipse: React.FC<IEllipseProps> = ({
  id,
  selectionColor,
  layer,
  onPointerDown,
}) => {
  const {
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
        <ellipse
          style={{
            transform: `translate(${layer.x}px, ${layer.y}px)`,
          }}
          cx={layer.width / 2}
          cy={layer.height / 2}
          rx={layer.width / 2}
          ry={layer.height / 2}
          strokeWidth={strokeWidth}
          fillOpacity={0}
          strokeDasharray={strokeDasharray}
          strokeOpacity={strokeOpacity}
          stroke={rgbToHex(stroke || INITIAL_LAYER_STROKE_COLOR)}
        />
      )}
      <ellipse
        className="drop-shadow-md cursor-all-scroll"
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
          transform: `translate(${layer.x}px, ${layer.y}px)`,
        }}
        cx={layer.width / 2}
        cy={layer.height / 2}
        rx={layer.width / 2}
        ry={layer.height / 2}
        strokeWidth={1}
        fillOpacity={fillOpacity}
        fill={rgbToHex(fill)}
        stroke={selectionColor || "transparent"}
      />
    </>
  );
};
