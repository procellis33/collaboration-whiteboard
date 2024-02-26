import { useState, useLayoutEffect } from "react";

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

    let debounceTimer: string | number | NodeJS.Timeout | undefined;
    const debouncedUpdate = (): void => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(updateDeviceParams, 200);
    };

    window.addEventListener("resize", debouncedUpdate);

    updateDeviceParams();

    return () => {
      window.removeEventListener("resize", debouncedUpdate);
    };
  }, []);

  return deviceParams;
};

export default useDeviceParams;
