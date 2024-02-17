"use client";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/app/(dashboard)/_components/emptyStates/EmptyState";
import { api } from "@/convex/_generated/api";
import { useOrganization } from "@clerk/nextjs";
import { useApiMutation } from "@/hooks/useApiMutation";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const EmptyData = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { pending, mutate } = useApiMutation(api.board.create);

  const handleClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "Untitled",
    })
      .then((id) => {
        toast.success("Board created");
        router.push(`/board/${id}`);
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <EmptyState
      header={"Create your first board"}
      subheader={"Start by creating a board for your organization"}
      imageSrc={"/emptyData.svg"}
    >
      <Button
        disabled={pending}
        onClick={handleClick}
        className={"mt-6"}
        size={"lg"}
      >
        Create board
      </Button>
    </EmptyState>
  );
};
