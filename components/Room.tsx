"use client";

import React from "react";
import { RoomProvider } from "@/liveblocks.config";
import { ClientSideSuspense } from "@liveblocks/react";

interface IRoomProps {
  children: React.ReactNode;
  roomId: string;
  fallback: NonNullable<React.ReactNode> | null;
}

export const Room: React.FC<IRoomProps> = ({ roomId, children, fallback }) => {
  return (
    <RoomProvider id={roomId} initialPresence={{}}>
      <ClientSideSuspense fallback={fallback}>
        {() => children}
      </ClientSideSuspense>
    </RoomProvider>
  );
};
