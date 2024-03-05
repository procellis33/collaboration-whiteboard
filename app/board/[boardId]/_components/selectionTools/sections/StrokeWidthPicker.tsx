"use client";

import React from "react";
import { EStrokeWidth } from "@/types/canvas";
import { SelectionGroup } from "@/app/board/[boardId]/_components/selectionTools/components/SelectionGroup";
import { SelectionButton } from "@/app/board/[boardId]/_components/selectionTools/components/SelectionButton";
import { Minus, MinusCircle } from "lucide-react";

interface IStrokeWidthPickerProps {
  onChange: (strokeWidth: EStrokeWidth) => void;
  currentStrokeWidth: EStrokeWidth;
}

export const StrokeWidthPicker: React.FC<IStrokeWidthPickerProps> = ({
  onChange,
  currentStrokeWidth,
}) => {
  return (
    <SelectionGroup label={"Stroke width"}>
      <SelectionButton
        hintLabel={"None"}
        onClick={() => onChange(EStrokeWidth.None)}
        icon={MinusCircle}
        selected={currentStrokeWidth === EStrokeWidth.None}
      />
      <SelectionButton
        hintLabel={"Thin"}
        onClick={() => onChange(EStrokeWidth.Thin)}
        icon={Minus}
        strokeWidth={EStrokeWidth.Thin}
        selected={currentStrokeWidth === EStrokeWidth.Thin}
      />
      <SelectionButton
        hintLabel={"Medium"}
        onClick={() => onChange(EStrokeWidth.Medium)}
        icon={Minus}
        strokeWidth={EStrokeWidth.Medium}
        selected={currentStrokeWidth === EStrokeWidth.Medium}
      />
      <SelectionButton
        hintLabel={"Extra bold"}
        onClick={() => onChange(EStrokeWidth.ExtraBold)}
        icon={Minus}
        strokeWidth={EStrokeWidth.ExtraBold}
        selected={currentStrokeWidth === EStrokeWidth.ExtraBold}
      />
    </SelectionGroup>
  );
};
