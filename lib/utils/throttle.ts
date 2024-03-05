export const throttleCreator = (DURATION: number) => {
  let timeout: string | number | NodeJS.Timeout | undefined = undefined;
  return <F extends (...args: any[]) => any>(callback: F) => {
    if (timeout === undefined) {
      callback();
      timeout = setTimeout(() => {
        // allow another call to be throttled
        timeout = undefined;
      }, DURATION);
    }
  };
};
