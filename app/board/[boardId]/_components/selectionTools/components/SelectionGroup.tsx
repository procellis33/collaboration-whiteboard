import React from "react";
import { twMerge } from "tailwind-merge";

interface ISelectionGroupProps {
  children?: React.ReactNode;
  label: string;
  className?: string;
}

export const SelectionGroup: React.FC<ISelectionGroupProps> = ({
  children,
  label,
  className,
}) => {
  return (
    <div className={"flex flex-col text-sm"}>
      <div className={"mb-1 md:mb-2"}>{label}</div>
      <div
        className={twMerge(
          "flex-row flex w-[200px] md:max-w-[230px] md:w-[230px] gap-x-1 md:gap-x-2",
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
};
