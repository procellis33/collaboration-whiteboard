import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/Hint";
import React from "react";

interface TToolButtonProps {
  label: string;
  icon: LucideIcon;
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
}) => {
  return (
    <Hint label={label} side="right" sideOffset={10}>
      <Button
        className={"px-1.5"}
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
