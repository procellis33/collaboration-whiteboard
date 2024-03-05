"use client";
import { ELayerType, TColor } from "@/types/canvas";
import React, { memo, SetStateAction, useEffect, useState } from "react";
import { useSelf, useStorage } from "@/liveblocks.config";
import { useSelectionBounds } from "@/hooks/useSelectionBounds";
import { StrokeWidthPicker } from "@/app/board/[boardId]/_components/selectionTools/sections/StrokeWidthPicker";
import { StrokeStylePicker } from "@/app/board/[boardId]/_components/selectionTools/sections/StrokeStylePicker";
import { OpacityPicker } from "@/app/board/[boardId]/_components/selectionTools/sections/OpacityPicker";
import { ActionsPicker } from "@/app/board/[boardId]/_components/selectionTools/sections/ActionsPicker";
import { ColorPickerModal } from "@/app/board/[boardId]/_components/selectionTools/components/ColorPickerModal";
import { ColorPicker } from "@/app/board/[boardId]/_components/selectionTools/sections/ColorPicker";
import { useSectionToolsSetters } from "@/hooks/useSectionToolsSetters";
import {
  INITIAL_LAYER_STROKE_COLOR,
  INITIAL_LAYER_STROKE_DASHARRAY,
  INITIAL_LAYER_STROKE_WIDTH,
  TW_MD,
} from "@/lib/consts";

interface ISelectionToolsProps {
  setCurrentColor: React.Dispatch<SetStateAction<TColor>>;
  isOpenMobile: boolean;
}

export type TColorPickerModes = "stroke" | "fill";

export const SelectionTools: React.FC<ISelectionToolsProps> = memo(
  ({ setCurrentColor, isOpenMobile }) => {
    const selection = useSelf((me) => me.presence.selection);
    const {
      setStrokeDashArray,
      setStrokeWidth,
      setStroke,
      setFillTransparent,
      setFill,
      setOpacity,
    } = useSectionToolsSetters(selection, setCurrentColor);

    const selectionBounds = useSelectionBounds();
    const layer = useStorage((root) =>
      root.layers.get(selection[selection.length - 1]),
    );

    const [pickerOpen, setPickerOpen] = useState(false);
    const [pickerMode, setPickerMode] = useState<TColorPickerModes>("stroke");

    useEffect(() => {
      if (!layer || !selectionBounds) setPickerOpen(false);
    }, [selectionBounds, layer]);

    if (
      !selectionBounds ||
      !layer ||
      (!isOpenMobile && window.innerWidth < TW_MD)
    )
      return null;

    const { fill, fillOpacity, stroke, strokeDasharray, strokeWidth } = layer;
    return (
      <div
        className={
          "absolute p-3 rounded-md bg-white shadow-sm border flex select-none left-2 top-[50%] -translate-y-[50%] flex-col gap-y-4 dark:bg-zinc-800"
        }
      >
        <ColorPicker
          label={"Background"}
          currentMode={pickerMode}
          setColorPicker={setPickerOpen}
          setColorPickerMode={setPickerMode}
          setFillTransparent={setFillTransparent}
          currentFillOpacity={fillOpacity}
          currentColor={fill}
          onChange={setFill}
        />
        {selection.length === 1 && (
          <>
            {layer.type !== ELayerType.Path &&
              layer.type !== ELayerType.Text && (
                <>
                  <ColorPicker
                    label={"Stroke"}
                    currentMode={pickerMode}
                    setColorPicker={setPickerOpen}
                    setColorPickerMode={setPickerMode}
                    currentColor={stroke || INITIAL_LAYER_STROKE_COLOR}
                    onChange={setStroke}
                  />
                  <StrokeWidthPicker
                    currentStrokeWidth={
                      strokeWidth === undefined
                        ? INITIAL_LAYER_STROKE_WIDTH
                        : strokeWidth
                    }
                    onChange={setStrokeWidth}
                  />
                  <StrokeStylePicker
                    currentStrokeDashArray={
                      strokeDasharray || INITIAL_LAYER_STROKE_DASHARRAY
                    }
                    onChange={setStrokeDashArray}
                  />
                </>
              )}
            <OpacityPicker
              currentFillOpacity={fillOpacity}
              onChange={setOpacity}
            />
          </>
        )}
        <ActionsPicker />
        <ColorPickerModal
          className={pickerMode === "stroke" ? "top-24" : "top-5"}
          isOpen={pickerOpen}
          currentColor={
            pickerMode === "stroke"
              ? stroke || INITIAL_LAYER_STROKE_COLOR
              : fill
          }
          currentFillOpacity={pickerMode === "stroke" ? undefined : fillOpacity}
          onChange={pickerMode === "stroke" ? setStroke : setFill}
          setState={setPickerOpen}
        />
      </div>
    );
  },
);

SelectionTools.displayName = "SelectionTools";
