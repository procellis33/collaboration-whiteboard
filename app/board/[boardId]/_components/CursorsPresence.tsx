"use client";
import React, { memo } from "react";
import { useOthersConnectionIds } from "@/liveblocks.config";
import { Cursor } from "@/app/board/[boardId]/_components/Cursor";

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

export const CursorsPresence: React.FC = memo(() => {
  return <Cursors />;
});

CursorsPresence.displayName = "CursorsPresence";
