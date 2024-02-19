import React from "react";
import { Canvas } from "@/app/board/[boardId]/_components/Canvas";

interface IBoardIdPageProps {
  params: { boardId: string };
}

const BoardIdPage: React.FC<IBoardIdPageProps> = async ({ params }) => {
  return <Canvas boardId={params.boardId} />;
};

export default BoardIdPage;
