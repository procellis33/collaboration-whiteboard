import React from "react";
import { Canvas } from "@/app/board/[boardId]/_components/Canvas";
import { Room } from "@/components/Room";
import { CanvasLoading } from "@/app/board/[boardId]/_components/CanvasLoading";

interface IBoardIdPageProps {
  params: { boardId: string };
}

const BoardIdPage: React.FC<IBoardIdPageProps> = async ({ params }) => {
  return (
    <Room roomId={params.boardId} fallback={<CanvasLoading />}>
      <Canvas boardId={params.boardId} />
    </Room>
  );
};

export default BoardIdPage;
