import { Loader } from "lucide-react";
import { InfoSkeleton } from "@/app/board/[boardId]/_components/canvasOverlay/Info";
import { ParticipantsSkeleton } from "@/app/board/[boardId]/_components/canvasOverlay/Participants";
import { ToolbarSkeleton } from "@/app/board/[boardId]/_components/canvasOverlay/Toolbar";
import { HistoryActionsSkeleton } from "@/app/board/[boardId]/_components/canvasOverlay/HistoryActions";
import { ZoomSkeleton } from "@/app/board/[boardId]/_components/canvasOverlay/Zoom";
import { LayerSettingsSkeleton } from "@/app/board/[boardId]/_components/canvasOverlay/LayerSettings";

export const CanvasLoading = () => {
  return (
    <main
      className={
        "h-full w-full relative bg-neutral-100 touch-none flex items-center justify-center dark:bg-neutral-900"
      }
    >
      <Loader className={"h-6 w-6 text-muted-foreground animate-spin"} />
      <InfoSkeleton />
      <HistoryActionsSkeleton />
      <ParticipantsSkeleton />
      <ToolbarSkeleton />
      <ZoomSkeleton />
      <LayerSettingsSkeleton />
    </main>
  );
};
