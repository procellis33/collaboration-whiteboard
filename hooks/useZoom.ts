"use client";
import { useEffect } from "react";

interface IUseZoom {
  zoomIn: () => void;
  zoomOut: () => void;
  resetZoom: () => void;
}

const useZoom = ({ zoomIn, zoomOut, resetZoom }: IUseZoom) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      switch (e.key) {
        case "=":
        case "+":
          {
            if (e.ctrlKey || e.metaKey) {
              e.preventDefault();
              zoomIn();
            }
          }
          break;
        case "-":
          {
            if (e.ctrlKey || e.metaKey) {
              e.preventDefault();
              zoomOut();
            }
          }
          break;
        case "0":
          {
            if (e.ctrlKey || e.metaKey) {
              resetZoom();
            }
          }
          break;
      }
    };

    const handleOnWheel = (e: WheelEvent): void => {
      if (e.ctrlKey || e.metaKey) {
        if (e.deltaY > 0) {
          e.preventDefault();
          zoomOut();
        } else if (e.deltaY < 0) {
          e.preventDefault();
          zoomIn();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("wheel", handleOnWheel, { passive: false });

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("wheel", handleOnWheel);
    };
  }, [zoomIn, zoomOut, resetZoom]);
};

export default useZoom;
