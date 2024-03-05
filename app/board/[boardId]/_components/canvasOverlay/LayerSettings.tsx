"use client";
import React, { SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/Hint";
import { SlidersHorizontal } from "lucide-react";
import { useSelf } from "@/liveblocks.config";

interface ILayerSettingsProps {
  setIsOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const LayerSettings: React.FC<ILayerSettingsProps> = ({ setIsOpen }) => {
  const selection = useSelf((me) => me.presence.selection);
  return (
    <div
      className={
        "md:hidden absolute bottom-2 right-2 bg-white rounded-md px-canvas h-canvas shadow-md flex items-center dark:bg-zinc-800"
      }
    >
      <Hint label={"Settings"} side="top" sideOffset={10}>
        <Button
          disabled={selection.length === 0}
          className={"p-2"}
          variant={"canvas"}
          onClick={() => setIsOpen((open) => !open)}
        >
          <SlidersHorizontal />
        </Button>
      </Hint>
    </div>
  );
};

export const LayerSettingsSkeleton: React.FC = () => {
  return (
    <div
      className={
        "size-[48px] dark:bg-zinc-800 md:hidden absolute bottom-2 right-2 bg-white rounded-md px-canvas h-canvas shadow-md flex items-center"
      }
    />
  );
};
