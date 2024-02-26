"use client";
import { useEffect } from "react";

interface IUseZoom {
  zoomIn: () => void;
  zoomOut: () => void;
}

const useZoom = ({ zoomIn, zoomOut }: IUseZoom) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.ctrlKey && (event.key === "+" || event.key === "=")) {
        event.preventDefault();
        zoomIn();
      } else if (event.ctrlKey && event.key === "-") {
        event.preventDefault();
        zoomOut();
      }
    };

    const handleOnWheel = (event: WheelEvent): void => {
      if (event.ctrlKey) {
        if (event.deltaY > 0) {
          event.preventDefault();
          zoomOut();
        } else if (event.deltaY < 0) {
          event.preventDefault();
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
  }, [zoomIn, zoomOut]);
};

export default useZoom;
