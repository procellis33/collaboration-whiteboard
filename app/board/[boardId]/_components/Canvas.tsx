"use client";

import React, { useCallback, useMemo, useState } from "react";
import { Info } from "@/app/board/[boardId]/_components/canvasOverlay/Info";
import { Participants } from "@/app/board/[boardId]/_components/canvasOverlay/Participants";
import { Toolbar } from "@/app/board/[boardId]/_components/canvasOverlay/Toolbar";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useOthersMapped,
  useSelf,
  useStorage,
} from "@/liveblocks.config";
import {
  ECanvasMode,
  ESide,
  TCamera,
  TCanvasState,
  TColor,
  TXYWH,
} from "@/types/canvas";
import { CursorsPresence } from "@/app/board/[boardId]/_components/CursorsPresence";
import { pointerEventToCanvasPoint } from "@/lib/utils/pointerEventToCanvasPoint";
import { LayerPreview } from "@/app/board/[boardId]/_components/canvasDrawable/LayerPreview";
import useDeviceParams from "@/hooks/useDeviceParams";
import { Zoom } from "@/app/board/[boardId]/_components/canvasOverlay/Zoom";
import { twMerge } from "tailwind-merge";
import { HistoryActions } from "@/app/board/[boardId]/_components/canvasOverlay/HistoryActions";
import { idToColor } from "@/lib/utils/idToColor";
import { SelectionBox } from "@/app/board/[boardId]/_components/SelectionBox";
import { SelectionTools } from "@/app/board/[boardId]/_components/selectionTools/SelectionTools";
import { Path } from "@/app/board/[boardId]/_components/canvasDrawable/Path";
import { rgbToHex } from "@/lib/utils/rgbToHex";
import { useDisableScrollBounce } from "@/hooks/useDisableScrollBounce";
import { useHotKeys } from "@/hooks/useHotKeys";
import { throttleCreator } from "@/lib/utils/throttle";
import {
  DEFAULT_CAMERA_POSITION,
  DEFAULT_MOUSE_POSITION,
  DEFAULT_SCALE,
  DEFAULT_THROTTLE_DURATION,
  INITIAL_LAYER_COLOR,
} from "@/lib/consts";
import { useLayerActions } from "@/hooks/useLayerActions";
import { useTranslateSelectedLayers } from "@/hooks/useTranslateSelectedLayers";
import { useResizeSelectedLayer } from "@/hooks/useResizeSelectedLayer";
import { useDrawing } from "@/hooks/useDrawing";
import { useUpdateSelectionNet } from "@/hooks/useUpdateSelectionNet";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { CanvasLoading } from "@/app/board/[boardId]/_components/CanvasLoading";
import { LayerSettings } from "@/app/board/[boardId]/_components/canvasOverlay/LayerSettings";

const throttle = throttleCreator(DEFAULT_THROTTLE_DURATION);

interface ICanvasProps {
  boardId: string;
}

export const Canvas: React.FC<ICanvasProps> = ({ boardId }) => {
  const layerIds = useStorage((root) => root.layerIds);
  const [canvasState, setCanvasState] = useState<TCanvasState>({
    mode: ECanvasMode.None,
  });
  const [camera, setCamera] = useState<TCamera>(DEFAULT_CAMERA_POSITION);
  const [currentColor, setCurrentColor] = useState<TColor>(INITIAL_LAYER_COLOR);
  const [isWheelPressed, setIsWheelPressed] = useState(false);
  const [initialMousePosition, setInitialMousePosition] = useState(
    DEFAULT_MOUSE_POSITION,
  );
  const [scale, setScale] = useState(DEFAULT_SCALE);

  const [openMobileLayerSettings, setOpenMobileLayerSettings] = useState(false);

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  const pencilDraft = useSelf((me) => me.presence.pencilDraft);

  useDisableScrollBounce();

  const { width, height } = useDeviceParams();

  useHotKeys({
    history: { redo: history.redo, canRedo, undo: history.undo, canUndo },
  });

  const { insertLayer, unselectLayers, startMultiSelection } =
    useLayerActions();
  const { translateSelectedLayers } = useTranslateSelectedLayers(
    setCanvasState,
    canvasState,
  );
  const { resizeSelectedLayer } = useResizeSelectedLayer(canvasState);
  const { continueDrawing, startDrawing, insertPath } = useDrawing(
    canvasState,
    setCanvasState,
    currentColor,
  );
  const { updateSelectionNet } = useUpdateSelectionNet(
    layerIds,
    setCanvasState,
  );

  const cameraGripMovement = useCallback(
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

  const onResizeHandlePointerDown = useCallback(
    (corner: ESide, initialBounds: TXYWH) => {
      history.pause();
      setCanvasState({
        mode: ECanvasMode.Resizing,
        initialBounds,
        corner,
      });
    },
    [history],
  );

  const onWheel = useCallback(
    (e: React.WheelEvent) => {
      if (e.ctrlKey) return;
      setCamera((camera) => ({
        x: camera.x - e.deltaX,
        y: camera.y - e.deltaY,
      }));
    },
    [setCamera],
  );

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();

      const current = pointerEventToCanvasPoint(e, camera, scale);

      if (canvasState.mode === ECanvasMode.Pressing) {
        startMultiSelection(current, canvasState.origin, setCanvasState);
      } else if (canvasState.mode === ECanvasMode.SelectionNet) {
        updateSelectionNet(current, canvasState.origin);
      } else if (canvasState.mode === ECanvasMode.Translating) {
        translateSelectedLayers(current);
      } else if (canvasState.mode === ECanvasMode.Resizing) {
        resizeSelectedLayer(current);
      } else if (canvasState.mode === ECanvasMode.Pencil) {
        continueDrawing(current, e);
      }

      setMyPresence({ cursor: current });
    },
    [
      camera,
      scale,
      canvasState.mode,
      resizeSelectedLayer,
      startMultiSelection,
      updateSelectionNet,
      translateSelectedLayers,
      continueDrawing,
    ],
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({ cursor: null });
  }, []);

  const onPointerUp = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      setIsWheelPressed(false);

      if (e.button !== 0) return;

      if (canvasState.mode === ECanvasMode.None)
        setMyPresence({ selection: [] });

      const point = pointerEventToCanvasPoint(e, camera, scale);

      if (
        canvasState.mode === ECanvasMode.None ||
        canvasState.mode === ECanvasMode.Pressing
      ) {
        unselectLayers();
        setCanvasState({ mode: ECanvasMode.None });
      } else if (canvasState.mode === ECanvasMode.Pencil) {
        insertPath();
      } else if (canvasState.mode === ECanvasMode.Inserting) {
        insertLayer(canvasState.layerType, point, setCanvasState, currentColor);
      } else setCanvasState({ mode: ECanvasMode.None });
      history.resume();
    },
    [
      camera,
      canvasState,
      history,
      insertLayer,
      scale,
      unselectLayers,
      setCanvasState,
      insertPath,
    ],
  );

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (e.button === 1) {
        // Button 1 is the mouse wheel button
        setIsWheelPressed(true);
        setInitialMousePosition({ x: e.clientX, y: e.clientY });
      }

      if (e.button !== 0) return;

      const point = pointerEventToCanvasPoint(e, camera, scale);

      if (canvasState.mode === ECanvasMode.Inserting) return;

      if (canvasState.mode === ECanvasMode.Pencil) {
        unselectLayers();
        startDrawing(point, e.pressure);
        return;
      }

      setCanvasState({ origin: point, mode: ECanvasMode.Pressing });
    },
    [
      camera,
      scale,
      setCanvasState,
      canvasState.mode,
      startDrawing,
      unselectLayers,
    ],
  );

  const selections = useOthersMapped((other) => other.presence.selection);

  const onLayerPointerDown = useMutation(
    ({ self, setMyPresence }, e: React.PointerEvent, layerId: string) => {
      if (e.button !== 0) return;

      if (
        canvasState.mode === ECanvasMode.Pencil ||
        canvasState.mode === ECanvasMode.Inserting
      )
        return;

      history.pause();
      e.stopPropagation();

      const point = pointerEventToCanvasPoint(e, camera, scale);

      if (!self.presence.selection.includes(layerId))
        setMyPresence({ selection: [layerId] }, { addToHistory: true });

      setCanvasState({ mode: ECanvasMode.Translating, current: point });
    },
    [setCanvasState, camera, history, canvasState.mode, scale],
  );

  const layerIdsToColorSelection = useMemo(() => {
    const layerIdsToColorSelection: Record<string, string> = {};

    for (const user of selections) {
      const [connectionId, selection] = user;

      for (const layerId of selection) {
        layerIdsToColorSelection[layerId] = idToColor(connectionId);
      }
    }

    return layerIdsToColorSelection;
  }, [selections]);

  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });
  if (!data) return <CanvasLoading />;

  return (
    <main
      className={
        "h-full w-full relative bg-neutral-100 dark:bg-neutral-900 touch-none"
      }
    >
      <Info boardId={boardId} />
      <Participants />
      <Toolbar canvasState={canvasState} setCanvasState={setCanvasState} />
      <HistoryActions
        canRedo={canRedo}
        canUndo={canUndo}
        undo={history.undo}
        redo={history.redo}
      />
      <LayerSettings setIsOpen={setOpenMobileLayerSettings} />
      <Zoom setScale={setScale} scale={scale} />
      <SelectionTools
        isOpenMobile={openMobileLayerSettings}
        setCurrentColor={setCurrentColor}
      />
      <svg
        className={twMerge(
          "h-[100vh] w-[100vw]",
          isWheelPressed && "cursor-grab",
        )}
        onWheel={onWheel}
        viewBox={`0 0 ${width * scale} ${height * scale}`}
        onPointerMove={(e) => {
          throttle(() => {
            onPointerMove(e);
            cameraGripMovement(e);
          });
        }}
        onPointerLeave={onPointerLeave}
        onPointerUp={onPointerUp}
        onPointerDown={onPointerDown}
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
              onLayerPointerDown={onLayerPointerDown}
              selectionColor={layerIdsToColorSelection[layerId]}
            />
          ))}
          <SelectionBox onResizePointerDown={onResizeHandlePointerDown} />
          {canvasState.mode === ECanvasMode.SelectionNet &&
            canvasState.current !== undefined && (
              <rect
                className={"fill-blue-500/5 stroke-blue-500 stroke-1"}
                x={Math.min(canvasState.origin.x, canvasState.current.x)}
                y={Math.min(canvasState.origin.y, canvasState.current.y)}
                width={Math.abs(canvasState.origin.x - canvasState.current.x)}
                height={Math.abs(canvasState.origin.y - canvasState.current.y)}
              />
            )}
          <CursorsPresence />
          {pencilDraft !== null && pencilDraft.length > 1 && (
            <Path
              x={0}
              y={0}
              points={pencilDraft}
              fill={rgbToHex(currentColor)}
            />
          )}
        </g>
      </svg>
    </main>
  );
};
