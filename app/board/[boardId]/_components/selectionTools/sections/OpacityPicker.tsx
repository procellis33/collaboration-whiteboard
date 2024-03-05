import { Slider } from "@/components/ui/slider";
import { SelectionGroup } from "@/app/board/[boardId]/_components/selectionTools/components/SelectionGroup";
import React from "react";

interface IOpacityPickerProps {
  onChange: (opacity: number) => void;
  currentFillOpacity: number;
}

export const OpacityPicker: React.FC<IOpacityPickerProps> = ({
  onChange,
  currentFillOpacity,
}) => {
  return (
    <SelectionGroup label={"Opacity"}>
      <Slider
        className={"cursor-pointer"}
        max={1}
        step={0.01}
        value={[currentFillOpacity]}
        onValueChange={(value) => onChange(value[0])}
      />
    </SelectionGroup>
  );
};
