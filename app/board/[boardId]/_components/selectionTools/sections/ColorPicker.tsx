"use client";

import React, { SetStateAction } from "react";
import { TColor } from "@/types/canvas";
import { MinusCircle } from "lucide-react";
import { SelectionGroup } from "@/app/board/[boardId]/_components/selectionTools/components/SelectionGroup";
import { rgbToHex } from "@/lib/utils/rgbToHex";
import { TColorPickerModes } from "@/app/board/[boardId]/_components/selectionTools/SelectionTools";
import { SelectionButton } from "@/app/board/[boardId]/_components/selectionTools/components/SelectionButton";
import { COLORS_PICKER } from "@/lib/consts";

interface IColorPickerProps {
  label: string;
  onChange: (color: TColor) => void;
  setFillTransparent?: () => void;
  currentFillOpacity?: number;
  currentColor: TColor;
  setColorPicker: React.Dispatch<SetStateAction<boolean>>;
  setColorPickerMode: React.Dispatch<SetStateAction<TColorPickerModes>>;
  currentMode: TColorPickerModes;
}

export const ColorPicker: React.FC<IColorPickerProps> = ({
  onChange,
  setFillTransparent,
  currentFillOpacity,
  currentColor,
  setColorPicker,
  setColorPickerMode,
  currentMode,
  label,
}) => {
  return (
    <SelectionGroup label={label}>
      <div
        className={
          "flex flex-wrap gap-1 items-center pr-1 md:pr-2 border-r border-neutral-200 relative"
        }
      >
        {label === "Background" && setFillTransparent && (
          <SelectionButton
            selected={currentFillOpacity === 0}
            hintLabel={"transparent"}
            className={"md:size-8 size-7"}
            onClick={() => {
              setFillTransparent();
              setColorPicker(false);
            }}
            icon={MinusCircle}
          />
        )}
        {COLORS_PICKER.map((item, index) => {
          if (label === "Background" && index === 0) return null;
          return (
            <SelectionButton
              key={rgbToHex(item) + Math.random()}
              className={"md:size-8 size-7"}
              backgroundHex={rgbToHex(item)}
              selected={
                rgbToHex(currentColor) === rgbToHex(item) &&
                currentFillOpacity !== 0
              }
              hintLabel={rgbToHex(item)}
              onClick={() => {
                onChange(item);
                setColorPicker(false);
              }}
            />
          );
        })}
      </div>
      <SelectionButton
        selected={false}
        hintLabel={
          currentFillOpacity === 0 ? "transparent" : rgbToHex(currentColor)
        }
        onClick={() => {
          setColorPicker((state) => {
            if (label === "Background") {
              return currentMode === "fill" ? !state : true;
            } else {
              return currentMode === "stroke" ? !state : true;
            }
          });

          setColorPickerMode(() =>
            label === "Background" ? "fill" : "stroke",
          );
        }}
        icon={currentFillOpacity === 0 ? MinusCircle : undefined}
        backgroundHex={rgbToHex(currentColor)}
      />
    </SelectionGroup>
  );
};
