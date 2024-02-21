"use client";
import React from "react";
import { cn } from "@/lib/utils/twMerge";
import { Plus } from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface INewOrgButtonProps {
  orgId: string;
  disabled?: boolean;
}
export const NewOrgButton: React.FC<INewOrgButtonProps> = ({
  orgId,
  disabled,
}) => {
  const router = useRouter();
  const { pending, mutate } = useApiMutation(api.board.create);

  const handleClick = () => {
    mutate({
      orgId: orgId,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
        router.push(`/board/${id}`);
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <button
      disabled={disabled || pending}
      className={cn(
        "col-span-1 aspect-[100/127] rounded-lg bg-blue-600 hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (disabled || pending) &&
          "opacity-75 hover:bg-blue-600 cursor-not-allowed",
      )}
      onClick={handleClick}
    >
      <Plus className={"h-12 w-12 text-white stroke-1"} />
      <p className={"text-sm text-white font-light"}>New board</p>
    </button>
  );
};
