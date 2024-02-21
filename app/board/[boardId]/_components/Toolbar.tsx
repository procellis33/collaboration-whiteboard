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
import { ToolButton } from "@/app/board/[boardId]/_components/ToolButton";
import { ECanvasMode, TCanvasState, ELayerType } from "@/types/canvas";

interface IToolbarProps {
  canvasState: TCanvasState;
  setCanvasState: (newState: TCanvasState) => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const Toolbar: React.FC<IToolbarProps> = ({
  canvasState,
  setCanvasState,
  canRedo,
  redo,
  canUndo,
  undo,
}) => {
  return (
    <div
      className={
        "absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4"
      }
    >
      <div
        className={
          "bg-white rounded-md p-1 flex gap-y-0.5 flex-col items-center shadow-md"
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
      <div
        className={
          "bg-white rounded-md p-1 flex gap-y-0.5 flex-col items-center shadow-md"
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
    </div>
  );
};

export const ToolbarSkeleton: React.FC = () => {
  return (
    <div
      className={
        "absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 w-[52px] animate-pulse"
      }
    >
      <div
        className={
          "bg-white rounded-md p-1 flex gap-y-0.5 flex-col items-center shadow-md h-[360px]"
        }
      />
      <div
        className={
          "bg-white rounded-md p-1 flex gap-y-0.5 flex-col items-center shadow-md h-[80px]"
        }
      />
    </div>
  );
};
