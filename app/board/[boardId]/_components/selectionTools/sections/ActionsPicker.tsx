"use client";
import { SelectionGroup } from "@/app/board/[boardId]/_components/selectionTools/components/SelectionGroup";
import { SelectionButton } from "@/app/board/[boardId]/_components/selectionTools/components/SelectionButton";
import { Trash2, BringToFront, SendToBack } from "lucide-react";
import React from "react";
import { useLayerOrder } from "@/hooks/useLayerOrder";
import { useLayerActions } from "@/hooks/useLayerActions";

export const ActionsPicker: React.FC = () => {
  const { sendToBack, bringToFront, selection: as1 } = useLayerOrder();
  const { deleteLayers } = useLayerActions();

  return (
    <SelectionGroup label={"Actions"}>
      <SelectionButton
        hintLabel={"Bring to front"}
        hintShortcut={"Ctrl/Cmd + ArrowUp"}
        onClick={bringToFront}
        icon={BringToFront}
      />
      <SelectionButton
        hintLabel={"Send to back"}
        hintShortcut={"Ctrl/Cmd + ArrowDown"}
        onClick={sendToBack}
        icon={SendToBack}
      />
      <SelectionButton
        hintLabel={"Delete"}
        hintShortcut={"Del"}
        onClick={deleteLayers}
        icon={Trash2}
      />
    </SelectionGroup>
  );
};
