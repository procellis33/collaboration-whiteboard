"use client";
import React, { memo } from "react";
import { useOthersConnectionIds, useOthersMapped } from "@/liveblocks.config";
import { Cursor } from "@/app/board/[boardId]/_components/Cursor";
import { shallow } from "@liveblocks/react";
import { Path } from "@/app/board/[boardId]/_components/canvasDrawable/Path";
import { rgbToHex } from "@/lib/utils/rgbToHex";
import { DEFAULT_FALLBACK_COLOR } from "@/lib/consts";

const Cursors: React.FC = () => {
  const ids = useOthersConnectionIds();
  return (
    <>
      {ids.map((connectionId) => (
        <Cursor key={connectionId} connectionId={connectionId} />
      ))}
    </>
  );
};

const Drafts = () => {
  const others = useOthersMapped(
    (other) => ({
      pencilDraft: other.presence.pencilDraft,
      pencilColor: other.presence.penColor,
    }),
    shallow,
  );

  return (
    <>
      {others.map(([key, other]) => {
        if (other.pencilDraft) {
          return (
            <Path
              key={key}
              x={0}
              y={0}
              points={other.pencilDraft}
              fill={
                other.pencilColor
                  ? rgbToHex(other.pencilColor)
                  : DEFAULT_FALLBACK_COLOR
              }
            />
          );
        }
      })}
    </>
  );
};

export const CursorsPresence: React.FC = memo(() => {
  return (
    <>
      <Drafts />
      <Cursors />
    </>
  );
});

CursorsPresence.displayName = "CursorsPresence";
