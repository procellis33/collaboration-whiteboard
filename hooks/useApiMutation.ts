"use client";
import { useState } from "react";
import { useMutation } from "convex/react";
import { FunctionReference, OptionalRestArgs } from "convex/server";
import {
  MUTATE_OPERATION_ERROR,
  MUTATE_OPERATION_UNKNOWN_ERROR,
} from "@/lib/consts";

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
        if (e instanceof Error) throw new Error(MUTATE_OPERATION_ERROR);
        throw new Error(MUTATE_OPERATION_UNKNOWN_ERROR);
      })
      .finally(() => setPending(false));
  };

  return {
    mutate,
    pending,
  };
};
