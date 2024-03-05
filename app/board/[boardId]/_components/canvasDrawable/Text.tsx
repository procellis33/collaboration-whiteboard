import { TTextLayer } from "@/types/canvas";
import React from "react";
import { rgbToHex } from "@/lib/utils/rgbToHex";
import { Kalam } from "next/font/google";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";
import { twMerge } from "tailwind-merge";
import { useMutation } from "@/liveblocks.config";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400"],
});

const calculateFontSize = (width: number, height: number) => {
  const maxFontSize = 96;
  const scaleFactor = 0.5;
  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;
  return Math.min(fontSizeBasedOnHeight, fontSizeBasedOnWidth, maxFontSize);
};

interface ITextProps {
  id: string;
  layer: TTextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

export const Text: React.FC<ITextProps> = ({
  id,
  selectionColor,
  layer,
  onPointerDown,
}) => {
  const { x, y, width, height, fill, fillOpacity, value } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <>
      <foreignObject
        x={x}
        y={y}
        width={width}
        height={height}
        onPointerDown={(e) => onPointerDown(e, id)}
        style={{
          outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        }}
      >
        <ContentEditable
          html={value || "Text"}
          onChange={handleContentChange}
          className={twMerge(
            "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
            font.className,
          )}
          style={{
            color: rgbToHex(fill),
            opacity: fillOpacity,
            fontSize: calculateFontSize(width, height),
          }}
        />
      </foreignObject>
    </>
  );
};
