"use client";

import React, { useCallback, useState } from "react";
import { Info } from "@/app/board/[boardId]/_components/canvasOverlay/Info";
import { Participants } from "@/app/board/[boardId]/_components/canvasOverlay/Participants";
import { Toolbar } from "@/app/board/[boardId]/_components/canvasOverlay/Toolbar";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useStorage,
} from "@/liveblocks.config";
import {
  ECanvasMode,
  ELayerType,
  TCamera,
  TCanvasState,
  TColor,
  TPoint,
} from "@/types/canvas";
import { CursorsPresence } from "@/app/board/[boardId]/_components/CursorsPresence";
import { pointerEventToCanvasPoint } from "@/lib/utils/pointerEventToCanvasPoint";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";
import { LayerPreview } from "@/app/board/[boardId]/_components/canvasDrawable/LayerPreview";
import useDeviceParams from "@/hooks/useDeviceParams";
import { Zoom } from "@/app/board/[boardId]/_components/canvasOverlay/Zoom";
import { twMerge } from "tailwind-merge";
import { HistoryActions } from "@/app/board/[boardId]/_components/canvasOverlay/HistoryActions";

const MAX_LAYERS = 1000;

interface ICanvasProps {
  boardId: string;
}

export const Canvas: React.FC<ICanvasProps> = ({ boardId }) => {
  const layerIds = useStorage((root) => root.layerIds);
  const [canvasState, setCanvasState] = useState<TCanvasState>({
    mode: ECanvasMode.None,
  });
  const [camera, setCamera] = useState<TCamera>({ x: 0, y: 0 });
  const [lastUsedColor, setLastUsedColor] = useState<TColor>({
    r: 0,
    g: 0,
    b: 0,
  });
  const [isWheelPressed, setIsWheelPressed] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [scale, setScale] = useState(1);

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const deviceParams = useDeviceParams();

  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType: Exclude<ELayerType, ELayerType.Path>,
      position: TPoint,
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) return;
      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();
      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence({ selection: [layerId] }, { addToHistory: true });
      setCanvasState({ mode: ECanvasMode.None });
    },
    [lastUsedColor],
  );

  const onMouseDown = (e: React.MouseEvent) => {
    if (e.button === 1) {
      // Button 1 is the mouse wheel button
      setIsWheelPressed(true);
      setInitialMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const onMouseUp = () => {
    setIsWheelPressed(false);
  };

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (isWheelPressed) {
        const deltaX = initialMousePosition.x - e.clientX;
        const deltaY = initialMousePosition.y - e.clientY;
        setInitialMousePosition({ x: e.clientX, y: e.clientY });
        setCamera((camera) => ({
          x: camera.x - deltaX,
          y: camera.y - deltaY,
        }));
      }
    },
    [isWheelPressed, initialMousePosition.x, initialMousePosition.y],
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    if (e.ctrlKey) return;
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera, scale);
      setMyPresence({ cursor: current });
    },
    [camera, scale],
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerUp = useMutation(
    ({}, e: React.PointerEvent) => {
      if (e.button !== 0) return;
      const point = pointerEventToCanvasPoint(e, camera, scale);
      if (canvasState.mode === ECanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point);
      } else setCanvasState({ mode: ECanvasMode.None });
      history.resume();
    },
    [camera, canvasState, history, insertLayer],
  );

  return (
    <main className={"h-full w-full relative bg-neutral-100 touch-none"}>
      <Info boardId={boardId} />
      <Participants />
      <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} />
      <HistoryActions
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <Zoom setScale={setScale} scale={scale} />
      <svg
        className={twMerge(
          "h-[100vh] w-[100vw]",
          isWheelPressed && "cursor-grab",
        )}
        onWheel={onWheel}
        viewBox={`0 0 ${deviceParams.width * scale} ${deviceParams.height * scale}`}
        onPointerMove={(e) => {
          onPointerMove(e);
          onMouseMove(e);
        }}
        onPointerLeave={onPointerLeave}
        onPointerUp={(e) => {
          onPointerUp(e);
          onMouseUp();
        }}
        onPointerDown={onMouseDown}
      >
        <g
          style={{
            transform: `translate(${camera.x}px, ${camera.y}px)`,
          }}
        >
          {layerIds.map((layerId) => (
            <LayerPreview
              key={layerId}
              id={layerId}
              onLayerPointerDown={() => {}}
              selectionColor={"#000"}
            />
          ))}
          <CursorsPresence />
        </g>
      </svg>
    </main>
  );
};
