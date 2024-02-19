import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface IHintProps {
  label: string;
  children: React.ReactNode;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
}
export const Hint: React.FC<IHintProps> = ({
  label,
  align,
  alignOffset,
  sideOffset,
  side,
  children,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={"text-white bg-black border-black"}
          side={side}
          align={align}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
        >
          <p className={"font-semibold"}>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
