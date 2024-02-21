import { TCamera } from "@/types/canvas";
import React from "react";

export const pointerEventToCanvasPoint = (
  e: React.PointerEvent,
  camera: TCamera,
) => {
  return {
    x: Math.round(e.clientX) - camera.x,
    y: Math.round(e.clientY) - camera.y,
  };
};
