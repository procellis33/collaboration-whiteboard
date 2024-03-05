"use client";
import { useMutation, useSelf } from "@/liveblocks.config";

interface IUseSendToBackReturn {
  sendToBack: () => void;
  bringToFront: () => void;
  selection: string[];
}

export const useLayerOrder = (): IUseSendToBackReturn => {
  const selection = useSelf((me) => me.presence.selection);

  const sendToBack = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toImmutable();

      arr.forEach((item, i) => {
        if (selection.includes(item)) indices.push(i);
      });

      indices.forEach((item, i) => {
        liveLayerIds.move(item, i);
      });
    },
    [selection],
  );

  const bringToFront = useMutation(
    ({ storage }) => {
      const liveLayerIds = storage.get("layerIds");
      const indices: number[] = [];

      const arr = liveLayerIds.toImmutable();

      arr.forEach((item, i) => {
        if (selection.includes(item)) indices.push(i);
      });

      for (let i = indices.length - 1; i >= 0; i--) {
        liveLayerIds.move(
          indices[i],
          arr.length - 1 - (indices.length - 1 - i),
        );
      }
    },
    [selection],
  );

  return { sendToBack, bringToFront, selection };
};
