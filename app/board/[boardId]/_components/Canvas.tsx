"use client";

import React, { useCallback, useState } from "react";
import { Info } from "@/app/board/[boardId]/_components/Info";
import { Participants } from "@/app/board/[boardId]/_components/Participants";
import { Toolbar } from "@/app/board/[boardId]/_components/Toolbar";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
} from "@/liveblocks.config";
import { ECanvasMode, TCamera, TCanvasState } from "@/types/canvas";
import { CursorsPresence } from "@/app/board/[boardId]/_components/CursorsPresence";
import { pointerEventToCanvasPoint } from "@/lib/utils/pointerEventToCanvasPoint";

interface ICanvasProps {
  boardId: string;
}

export const Canvas: React.FC<ICanvasProps> = ({ boardId }) => {
  const [canvasState, setCanvasState] = useState<TCanvasState>({
    mode: ECanvasMode.None,
  });
  const [camera, setCamera] = useState<TCamera>({ x: 0, y: 0 });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const onWheel = useCallback((e: React.WheelEvent) => {
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera);
      setMyPresence({ cursor: current });
    },
    [],
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

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
      <svg
        className={"h-[100vh] w-[100vw]"}
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
