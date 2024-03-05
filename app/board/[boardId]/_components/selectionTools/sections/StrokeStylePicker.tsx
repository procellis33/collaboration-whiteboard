"use client";

import React from "react";
import { EStrokeDasharray } from "@/types/canvas";
import { SelectionGroup } from "@/app/board/[boardId]/_components/selectionTools/components/SelectionGroup";
import { SelectionButton } from "@/app/board/[boardId]/_components/selectionTools/components/SelectionButton";
import { BoxSelect, Minus } from "lucide-react";

interface IStrokeStylePickerProps {
  onChange: (strokeDashArray: EStrokeDasharray) => void;
  currentStrokeDashArray: EStrokeDasharray;
}

export const StrokeStylePicker: React.FC<IStrokeStylePickerProps> = ({
  onChange,
  currentStrokeDashArray,
}) => {
  return (
    <SelectionGroup label={"Stroke style"}>
      <SelectionButton
        hintLabel={"Solid"}
        onClick={() => onChange(EStrokeDasharray.Solid)}
        icon={Minus}
        selected={currentStrokeDashArray === EStrokeDasharray.Solid}
      />
      <SelectionButton
        hintLabel={"Dotted"}
        onClick={() => onChange(EStrokeDasharray.Dotted)}
        icon={BoxSelect}
        strokeWidth={1}
        selected={currentStrokeDashArray === EStrokeDasharray.Dotted}
      />
      <SelectionButton
        hintLabel={"Dashed"}
        onClick={() => onChange(EStrokeDasharray.Dashed)}
        icon={BoxSelect}
        strokeWidth={2}
        selected={currentStrokeDashArray === EStrokeDasharray.Dashed}
      />
    </SelectionGroup>
  );
};
