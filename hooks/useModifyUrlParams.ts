import { useSearchParams } from "next/navigation";
import { useCallback } from "react";

/**
 * Hook for creating or updating query parameters in the URL while preserving existing parameters.
 * @returns {Function} A function that takes a parameter name and value, and returns the updated URL parameters string.
 */
export const useModifyUrlParams = (): Function => {
  const searchParams = useSearchParams()!;

  return useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );
};
