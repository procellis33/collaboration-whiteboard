import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/Hint";
import React from "react";

interface TToolButtonProps {
  label: string;
  icon: LucideIcon;
  shortcut?: string;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

export const ToolButton: React.FC<TToolButtonProps> = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
  shortcut,
}) => {
  return (
    <Hint label={label} side="bottom" sideOffset={10} shortcut={shortcut}>
      <Button
        className={"md:px-1.5 py-1.5"}
        disabled={isDisabled}
        onClick={onClick}
        size="icon"
        variant={isActive ? "canvasActive" : "canvas"}
      >
        <Icon />
      </Button>
    </Hint>
  );
};
