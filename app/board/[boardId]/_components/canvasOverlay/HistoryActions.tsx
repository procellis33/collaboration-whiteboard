import { ToolButton } from "@/app/board/[boardId]/_components/canvasOverlay/ToolButton";
import { Redo, Undo } from "lucide-react";
import React from "react";

interface IHistoryActionsProps {
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const HistoryActions: React.FC<IHistoryActionsProps> = ({
  undo,
  canUndo,
  redo,
  canRedo,
}) => {
  return (
    <div
      className={
        "absolute left-[180px] h-canvas px-canvas bottom-2 bg-white rounded-md p-1 flex gap-x-0.5 flex-row items-center shadow-md dark:bg-zinc-800"
      }
    >
      <ToolButton
        label="Undo"
        icon={Undo}
        onClick={undo}
        isDisabled={!canUndo}
      />
      <ToolButton
        label="Redo"
        icon={Redo}
        onClick={redo}
        isDisabled={!canRedo}
      />
    </div>
  );
};

export const HistoryActionsSkeleton: React.FC = () => {
  return (
    <div
      className={
        "absolute left-[180px] h-canvas px-canvas bottom-2 bg-white rounded-md p-1 flex gap-x-0.5 flex-row items-center shadow-md animate-pulse w-[90px] dark:bg-zinc-800"
      }
    />
  );
};
