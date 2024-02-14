"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { FunctionReference, OptionalRestArgs } from "convex/server";

export const useApiMutation = <Mutation extends FunctionReference<"mutation">>(
  mutationFunction: Mutation,
) => {
  const [pending, setPending] = useState(false);
  const apiMutation = useMutation(mutationFunction);

  const mutate = (...payload: OptionalRestArgs<Mutation>) => {
    setPending(true);
    return apiMutation(...payload)
      .then((result) => result)
      .catch((e: unknown) => {
        if (e instanceof Error) throw new Error("Failed to create board");
        throw new Error("Unknown error occurred");
      })
      .finally(() => setPending(false));
  };

  return {
    mutate,
    pending,
  };
};
