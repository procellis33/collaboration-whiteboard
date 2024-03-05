"use client";
import { useState, useLayoutEffect } from "react";
import { debounce } from "@/lib/utils/debounce";

interface IDeviceParams {
  width: number;
  height: number;
}

const useDeviceParams = (): IDeviceParams => {
  const [deviceParams, setDeviceParams] = useState<IDeviceParams>({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });

  useLayoutEffect(() => {
    const updateDeviceParams = (): void => {
      setDeviceParams({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };

    window.addEventListener("resize", debounce(updateDeviceParams, 200));

    return () => {
      window.removeEventListener("resize", debounce(updateDeviceParams, 200));
    };
  }, []);

  return deviceParams;
};

export default useDeviceParams;
