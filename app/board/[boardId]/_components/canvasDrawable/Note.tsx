import { TNoteLayer } from "@/types/canvas";
import React from "react";
import { rgbToHex } from "@/lib/utils/rgbToHex";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { twMerge } from "tailwind-merge";
import { useMutation } from "@/liveblocks.config";
import { getContrastingTextColor } from "@/lib/utils/getContrastingTextColor";
import { INITIAL_LAYER_STROKE_COLOR } from "@/lib/consts";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.15;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;
  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

interface INoteProps {
  id: string;
  layer: TNoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Note: React.FC<INoteProps> = ({
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
    value,
  } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

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
      <foreignObject
        x={x}
        y={y}
        width={width}
        height={height}
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
          outline: selectionColor ? `1px solid ${selectionColor}` : "none",
          background: rgbToHex(fill),
          opacity: fillOpacity,
        }}
        className={"shadow-md drop-shadow-xl"}
      >
        <ContentEditable
          html={value || "Text"}
          onChange={handleContentChange}
          className={twMerge(
            "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
            font.className,
          )}
          style={{
            color: getContrastingTextColor(fill),
            fontSize: calculateFontSize(width, height),
          }}
        />
      </foreignObject>
    </>
  );
};
