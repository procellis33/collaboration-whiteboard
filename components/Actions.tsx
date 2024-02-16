"use client";
import React, { useState } from "react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link2, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/useRenameModal";

interface IActionProps {
  id: Id<"boards">;
  title: string;
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
}

export const Actions: React.FC<IActionProps> = ({
  id,
  side,
  sideOffset,
  children,
  title,
}) => {
  const { pending, mutate } = useApiMutation(api.board.remove);
  const { onOpen } = useRenameModal();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDialogItemOpenChange = (open: boolean) => {
    if (!open) setDropdownOpen(false);
  };

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success("Link copied"))
      .catch(() => toast.error("Failed to copy link"));
  };

  const onDelete = () => {
    mutate({ id })
      .then(() => toast.success("Board deleted"))
      .catch((e) => toast.error(e.message));
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={sideOffset}
        side={side}
        onClick={(e) => e.stopPropagation()}
        className={"w-60"}
      >
        <DropdownMenuItem className={"p-3 cursor-pointer"} onClick={onCopyLink}>
          <Link2 className={"h-4 w-4 mr-2"} />
          Copy board link
        </DropdownMenuItem>
        <DropdownMenuItem
          className={"p-3 cursor-pointer"}
          onClick={() => onOpen(id, title)}
        >
          <Pencil className={"h-4 w-4 mr-2"} />
          Rename
        </DropdownMenuItem>
        <ConfirmModal
          onOpenChange={handleDialogItemOpenChange}
          header="Delete board?"
          description="This will delete the board and all of its contents."
          disabled={pending}
          onConfirm={onDelete}
        >
          <Button
            variant="ghost"
            className="p-3 cursor-pointer text-sm w-full justify-start font-normal"
          >
            <Trash2 className={"h-4 w-4 mr-2"} />
            Delete
          </Button>
        </ConfirmModal>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
