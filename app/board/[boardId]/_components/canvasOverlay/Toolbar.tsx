import React from "react";
import {
  Pencil,
  Circle,
  Square,
  StickyNote,
  Type,
  MousePointer2,
} from "lucide-react";
import { ToolButton } from "@/app/board/[boardId]/_components/canvasOverlay/ToolButton";
import { ECanvasMode, TCanvasState, ELayerType } from "@/types/canvas";

interface IToolbarProps {
  canvasState: TCanvasState;
  setCanvasState: (newState: TCanvasState) => void;
}

export const Toolbar: React.FC<IToolbarProps> = ({
  canvasState,
  setCanvasState,
}) => {
  return (
    <div
      className={
        "absolute md:left-[50%] md:-translate-x-[50%] md:h-canvas md:top-2 flex md:flex-row bg-white rounded-md p-1 md:gap-x-0.5 items-center shadow-md dark:bg-zinc-800 flex-col right-2 bottom-1/2 translate-y-1/2 md:translate-y-0 gap-y-0.5 md:w-[258px]"
      }
    >
      <ToolButton
        label="Select"
        icon={MousePointer2}
        onClick={() =>
          setCanvasState({
            mode: ECanvasMode.None,
          })
        }
        isActive={
          canvasState.mode === ECanvasMode.None ||
          canvasState.mode === ECanvasMode.Translating ||
          canvasState.mode === ECanvasMode.SelectionNet ||
          canvasState.mode === ECanvasMode.Pressing ||
          canvasState.mode === ECanvasMode.Resizing
        }
      />

      <ToolButton
        label="Text"
        icon={Type}
        onClick={() =>
          setCanvasState({
            mode: ECanvasMode.Inserting,
            layerType: ELayerType.Text,
          })
        }
        isActive={
          canvasState.mode === ECanvasMode.Inserting &&
          canvasState.layerType === ELayerType.Text
        }
      />
      <ToolButton
        label="Sticky note"
        icon={StickyNote}
        onClick={() =>
          setCanvasState({
            mode: ECanvasMode.Inserting,
            layerType: ELayerType.Note,
          })
        }
        isActive={
          canvasState.mode === ECanvasMode.Inserting &&
          canvasState.layerType === ELayerType.Note
        }
      />
      <ToolButton
        label="Rectangle"
        icon={Square}
        onClick={() =>
          setCanvasState({
            mode: ECanvasMode.Inserting,
            layerType: ELayerType.Rectangle,
          })
        }
        isActive={
          canvasState.mode === ECanvasMode.Inserting &&
          canvasState.layerType === ELayerType.Rectangle
        }
      />
      <ToolButton
        label="Ellipse"
        icon={Circle}
        onClick={() =>
          setCanvasState({
            mode: ECanvasMode.Inserting,
            layerType: ELayerType.Ellipse,
          })
        }
        isActive={
          canvasState.mode === ECanvasMode.Inserting &&
          canvasState.layerType === ELayerType.Ellipse
        }
      />
      <ToolButton
        label="Pen"
        icon={Pencil}
        onClick={() =>
          setCanvasState({
            mode: ECanvasMode.Pencil,
          })
        }
        isActive={canvasState.mode === ECanvasMode.Pencil}
      />
    </div>
  );
};

export const ToolbarSkeleton: React.FC = () => {
  return (
    <div
      className={
        "absolute md:left-1/2 md:-translate-x-1/2 md:h-canvas md:top-2 flex flex-row bg-white rounded-md p-1 md:gap-x-0.5 items-center shadow-md md:w-[258px] animate-pulse dark:bg-zinc-800 sm:right-2 sm:bottom-1/2 sm:h-[258px] sm:w-[48px] translate-y-1/2 md:translate-y-0"
      }
    />
  );
};
