"use client";
import { useEffect } from "react";
import { useLayerOrder } from "@/hooks/useLayerOrder";
import { useLayerActions } from "@/hooks/useLayerActions";
interface IUseHotKeysProps {
  history: {
    redo: () => void;
    canRedo: boolean;
    undo: () => void;
    canUndo: boolean;
  };
}

export const useHotKeys = ({ history }: IUseHotKeysProps) => {
  const { redo, canRedo, canUndo, undo } = history;
  const { deleteLayers } = useLayerActions();
  const { sendToBack, bringToFront } = useLayerOrder();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "z":
        case "Z":
          {
            if (e.ctrlKey || e.metaKey)
              e.shiftKey ? canRedo && redo() : canUndo && undo();
          }
          break;
        case "Delete":
          {
            deleteLayers();
          }
          break;
        case "ArrowUp":
          {
            if (e.ctrlKey || e.metaKey) bringToFront();
          }
          break;
        case "ArrowDown":
          {
            if (e.ctrlKey || e.metaKey) sendToBack();
          }
          break;
      }
    };

    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [undo, redo, canRedo, canUndo, deleteLayers, bringToFront, sendToBack]);
  return;
};
