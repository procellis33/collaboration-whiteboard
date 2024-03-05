import React, { SetStateAction } from "react";
import { TColor } from "@/types/canvas";
import { rgbToHex } from "@/lib/utils/rgbToHex";
import { twMerge } from "tailwind-merge";
import { SelectionGroup } from "@/app/board/[boardId]/_components/selectionTools/components/SelectionGroup";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  COLOR_COPY_SUCCESS,
  COLORS_PICKER_EXTENDED,
  FAILED_COPY_COLOR_ERROR,
} from "@/lib/consts";
import { SelectionButton } from "@/app/board/[boardId]/_components/selectionTools/components/SelectionButton";

interface IColorPickerModalProps {
  currentColor: TColor;
  currentFillOpacity?: number;
  onChange: (color: TColor) => void;
  setState: React.Dispatch<SetStateAction<boolean>>;
  isOpen: boolean;
  className?: string;
}

export const ColorPickerModal: React.FC<IColorPickerModalProps> = ({
  setState,
  currentColor,
  currentFillOpacity,
  onChange,
  isOpen,
  className,
}) => {
  if (!isOpen) return null;

  const hexColor = rgbToHex(currentColor);

  const copyHexCode = () => {
    navigator.clipboard
      .writeText(hexColor)
      .then(() => toast.success(COLOR_COPY_SUCCESS))
      .catch(() => toast.error(FAILED_COPY_COLOR_ERROR));
    setState(false);
  };

  return (
    <div
      className={twMerge(
        "absolute top-5 dark:bg-zinc-800 left-[14.5rem] md:left-[16.5rem] shadow-md border select-none rounded-md bg-white p-2 w-[190px] md:w-[210px] space-y-4",
        className,
      )}
    >
      <SelectionGroup
        label={"Colors"}
        className={"flex flex-row gap-2 flex-wrap max-w-[unset] w-[unset]"}
      >
        {COLORS_PICKER_EXTENDED.map((item) => (
          <SelectionButton
            className={"size-7 md:size-8"}
            key={rgbToHex(item) + item.r}
            selected={hexColor === rgbToHex(item) && currentFillOpacity !== 0}
            hintLabel={rgbToHex(item)}
            onClick={() => {
              setState(false);
              onChange(item);
            }}
            backgroundHex={rgbToHex(item)}
          />
        ))}
      </SelectionGroup>
      {currentFillOpacity !== 0 && (
        <SelectionGroup
          label={"Hex code"}
          className={"flex flex-row gap-2 flex-wrap max-w-[unset] w-[unset]"}
        >
          <Button
            variant={"canvas"}
            className={"relative w-[195px]"}
            onClick={copyHexCode}
          >
            <span
              className={
                "absolute font-medium text-lg top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground"
              }
            >
              #
            </span>
            <div className={"px-5 w-full text-center"}>
              {hexColor.substring(1)}
            </div>
          </Button>
        </SelectionGroup>
      )}
    </div>
  );
};
