"use client";

import React from "react";
import { Info } from "@/app/board/[boardId]/_components/Info";
import { Participants } from "@/app/board/[boardId]/_components/Participants";
import { Toolbar } from "@/app/board/[boardId]/_components/Toolbar";
import { useSelf } from "@/liveblocks.config";

interface ICanvasProps {
  boardId: string;
}

export const Canvas: React.FC<ICanvasProps> = () => {
  const info = useSelf((me) => me.info);
  return (
    <main className={"h-full w-full relative bg-neutral-100 touch-none"}>
      <Info />
      <Participants />
      <Toolbar />
    </main>
  );
};
