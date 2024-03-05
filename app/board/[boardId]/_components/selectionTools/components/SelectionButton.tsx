import { LucideIcon } from "lucide-react";
import React from "react";
import { twMerge } from "tailwind-merge";
import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";

interface ISelectionButtonProps {
  onClick: () => void;
  icon?: LucideIcon;
  strokeWidth?: number;
  selected?: boolean;
  hintLabel: string;
  hintShortcut?: string;
  className?: string;
  backgroundHex?: string;
}

export const SelectionButton: React.FC<ISelectionButtonProps> = ({
  onClick,
  icon: Icon,
  strokeWidth,
  selected,
  hintLabel,
  className,
  backgroundHex,
  hintShortcut,
}) => {
  return (
    <Hint
      label={hintLabel}
      shortcut={hintShortcut}
      side={"bottom"}
      sideOffset={5}
      className={"ml-7"}
      align={"start"}
    >
      <Button
        variant={"ghost"}
        className={twMerge(
          "md:size-9 size-8 p-1 items-center flex justify-center hover:opacity-75 transition rounded-md border border-neutral-300 cursor-pointer",
          selected && "ring-1 ring-offset-1 ring-indigo-400",
          className,
        )}
        style={{ background: backgroundHex }}
        onClick={onClick}
      >
        {Icon && <Icon className={"size-7"} strokeWidth={strokeWidth} />}
      </Button>
    </Hint>
  );
};
