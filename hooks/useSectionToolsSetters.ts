import { useMutation } from "@/liveblocks.config";
import { TColor, EStrokeDasharray, EStrokeWidth } from "@/types/canvas";
import React, { SetStateAction } from "react";

interface IUseSectionToolsSettersReturn {
  setFill: (fill: TColor) => void;
  setFillTransparent: () => void;
  setStroke: (stroke: TColor) => void;
  setStrokeWidth: (width: EStrokeWidth) => void;
  setStrokeDashArray: (dasharray: EStrokeDasharray) => void;
  setOpacity: (opacity: number) => void;
}

export const useSectionToolsSetters = (
  selection: readonly string[],
  setCurrentColor: React.Dispatch<SetStateAction<TColor>>,
): IUseSectionToolsSettersReturn => {
  const setFill = useMutation(
    ({ storage }, fill: TColor) => {
      const liveLayers = storage.get("layers");
      setCurrentColor(fill);

      selection.forEach((id) => {
        liveLayers.get(id)?.set("fill", fill);
        liveLayers.get(id)?.set("fillOpacity", 1);
      });
    },
    [selection, setCurrentColor],
  );

  const setFillTransparent = useMutation(
    ({ storage }) => {
      const liveLayers = storage.get("layers");

      selection.forEach((id) => {
        liveLayers.get(id)?.set("fillOpacity", 0);
        liveLayers.get(id)?.set("fill", { r: 255, g: 255, b: 255 });
      });
    },
    [selection],
  );

  const setStroke = useMutation(
    ({ storage }, stroke: TColor) => {
      const liveLayers = storage.get("layers");

      selection.forEach((id) => {
        liveLayers.get(id)?.set("stroke", stroke);
      });
    },
    [selection],
  );

  const setStrokeWidth = useMutation(
    ({ storage }, width: EStrokeWidth) => {
      const liveLayers = storage.get("layers");

      selection.forEach((id) => {
        liveLayers.get(id)?.set("strokeWidth", width);
      });
    },
    [selection],
  );

  const setStrokeDashArray = useMutation(
    ({ storage }, dasharray: EStrokeDasharray) => {
      const liveLayers = storage.get("layers");

      selection.forEach((id) => {
        liveLayers.get(id)?.set("strokeDasharray", dasharray);
      });
    },
    [selection],
  );

  const setOpacity = useMutation(
    ({ storage }, opacity: number) => {
      const liveLayers = storage.get("layers");

      selection.forEach((id) => {
        liveLayers.get(id)?.set("fillOpacity", opacity);
      });
    },
    [selection],
  );
  return {
    setFill,
    setOpacity,
    setStrokeDashArray,
    setStrokeWidth,
    setStroke,
    setFillTransparent,
  };
};
