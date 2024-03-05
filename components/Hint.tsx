import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { twMerge } from "tailwind-merge";

export interface IHintProps {
  label: string;
  children: React.ReactNode;
  shortcut?: string;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "center" | "end";
  sideOffset?: number;
  alignOffset?: number;
  className?: string;
}
export const Hint: React.FC<IHintProps> = ({
  label,
  align,
  alignOffset,
  sideOffset,
  side,
  children,
  className,
  shortcut,
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent
          className={twMerge("text-white bg-black border-black", className)}
          side={side}
          align={align}
          alignOffset={alignOffset}
          sideOffset={sideOffset}
        >
          <p className={"font-semibold"}>
            {label}
            {shortcut && (
              <span className={"text-xs ml-1 text-muted-foreground"}>
                ({shortcut})
              </span>
            )}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
