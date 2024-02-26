import { TCamera } from "@/types/canvas";
import React from "react";

export const pointerEventToCanvasPoint = (
  e: React.PointerEvent,
  camera: TCamera,
  scale: number,
) => {
  return {
    x: Math.round(e.clientX * scale) - camera.x,
    y: Math.round(e.clientY * scale) - camera.y,
  };
};
