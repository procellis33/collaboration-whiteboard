import React from "react";
import {
  Pencil,
  Circle,
  Square,
  StickyNote,
  Type,
  Undo,
  Redo,
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
        "absolute left-[50%] -translate-x-[50%] h-canvas top-2 flex flex-row bg-white rounded-md p-1 gap-x-0.5 items-center shadow-md"
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
        "absolute left-[50%] -translate-x-[50%] h-canvas top-2 flex flex-row bg-white rounded-md p-1 gap-x-0.5 items-center shadow-md w-[258px] animate-pulse"
      }
    />
  );
};
