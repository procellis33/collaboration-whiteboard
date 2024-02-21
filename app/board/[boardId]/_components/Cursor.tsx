"use client";
import React, { memo } from "react";
import { useOther } from "@/liveblocks.config";
import { MousePointer2 } from "lucide-react";
import { idToColor } from "@/lib/utils/idToColor";

interface ICursorProps {
  connectionId: number;
}
export const Cursor: React.FC<ICursorProps> = memo(({ connectionId }) => {
  const info = useOther(connectionId, (user) => user?.info);
  const cursor = useOther(connectionId, (user) => user.presence.cursor);
  const name = info?.name || "Anonymous";

  if (!cursor) return null;

  const { x, y } = cursor;

  return (
    <foreignObject
      x={x}
      y={y}
      style={{
        transform: `translateX(${x}) translateY(${y})`,
      }}
      height={50}
      width={name.length * 10 + 24}
      className={"relative drop-shadow-md"}
    >
      <MousePointer2
        className={"h-5 w-5"}
        style={{
          fill: idToColor(connectionId),
          color: idToColor(connectionId),
        }}
      />
      <div
        className={
          "text-xs absolute left-5 px-1.5 py-0.5 rounded-md text-white font-semibold"
        }
        style={{ backgroundColor: idToColor(connectionId) }}
      >
        {name}
      </div>
    </foreignObject>
  );
});

Cursor.displayName = "Cursor";
