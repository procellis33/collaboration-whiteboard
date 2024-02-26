"use client";

import React, { SetStateAction, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/Hint";
import { ZoomIn, ZoomOut } from "lucide-react";
import useZoom from "@/hooks/useZoom";

interface IZoomProps {
  setScale: React.Dispatch<SetStateAction<number>>;
  scale: number;
}

export const Zoom: React.FC<IZoomProps> = ({ setScale, scale }) => {
  const resetZoom = () => {
    setScale(1);
  };

  const zoomIn = useCallback(() => {
    setScale((scale) => {
      if (Number(scale.toFixed(10)) > 0.1) {
        return scale - 0.1;
      } else if (Number(scale.toFixed(10)) === 0.1) {
        return scale - 0.05;
      }
      return scale;
    });
  }, [setScale]);

  const zoomOut = useCallback(() => {
    setScale((scale) => {
      if (Number(scale.toFixed(10)) === 0.05) {
        return scale + 0.05;
      } else if (Number(scale.toFixed(10)) < 1.9) {
        return scale + 0.1;
      }
      return scale;
    });
  }, [setScale]);

  useZoom({ zoomIn, zoomOut });

  return (
    <div
      className={
        "absolute bottom-2 left-2 bg-white rounded-md px-canvas h-canvas shadow-md flex items-center gap-x-1"
      }
    >
      <Hint label={"Zoom In"} side="top" sideOffset={10}>
        <Button className={"p-2"} variant={"canvas"} onClick={zoomIn}>
          <ZoomIn />
        </Button>
      </Hint>
      <Hint label={"Reset Zoom"} side="top" sideOffset={10}>
        <Button
          variant={"none"}
          className={"px-1.5 font-semibold min-w-16"}
          onClick={resetZoom}
        >
          {Number(scale.toFixed(10)) === 0.05
            ? "200"
            : Math.round((2 - scale) * 100)}
          %
        </Button>
      </Hint>
      <Hint label={"Zoom Out"} side="top" sideOffset={10}>
        <Button className={"p-2"} variant={"canvas"} onClick={zoomOut}>
          <ZoomOut />
        </Button>
      </Hint>
    </div>
  );
};

export const ZoomSkeleton: React.FC = () => {
  return (
    <div
      className={
        "absolute bottom-2 left-2 bg-white rounded-md px-canvas h-canvas shadow-md flex items-center gap-x-1 animate-pulse w-[159px]"
      }
    />
  );
};
