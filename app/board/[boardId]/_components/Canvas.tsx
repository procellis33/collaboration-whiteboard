"use client";

import React, { useState } from "react";
import { Info } from "@/app/board/[boardId]/_components/Info";
import { Participants } from "@/app/board/[boardId]/_components/Participants";
import { Toolbar } from "@/app/board/[boardId]/_components/Toolbar";
import { useCanRedo, useCanUndo, useHistory } from "@/liveblocks.config";
import { ECanvasMode, TCanvasState } from "@/types/canvas";

interface ICanvasProps {
  boardId: string;
}

export const Canvas: React.FC<ICanvasProps> = ({ boardId }) => {
  const [canvasState, setCanvasState] = useState<TCanvasState>({
    mode: ECanvasMode.None,
  });
  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();
  return (
    <main className={"h-full w-full relative bg-neutral-100 touch-none"}>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
    </main>
  );
};
