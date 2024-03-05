"use client";
import React, { useState } from "react";
import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Link2,
  Pencil,
  Trash2,
  Github,
  Briefcase,
  Moon,
  Sun,
} from "lucide-react";
import { toast } from "sonner";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { ConfirmModal } from "@/components/ConfirmModal";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/useRenameModal";
import { useRouter } from "next/navigation";
import { twMerge } from "tailwind-merge";
import {
  BOARD_DELETE_SUCCESS,
  FAILED_COPY_LINK_ERROR,
  GITHUB_LINK,
  LINK_COPY_SUCCESS,
  PORTFOLIO_LINK,
} from "@/lib/consts";
import Image from "next/image";
import { useTheme } from "next-themes";

export enum EMode {
  Canvas,
}

interface IActionProps {
  id: Id<"boards">;
  title: string;
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  redirectHomeOnDelete?: boolean;
  className?: string;
  mode?: EMode;
}

export const Actions: React.FC<IActionProps> = ({
  id,
  side,
  sideOffset,
  children,
  title,
  redirectHomeOnDelete,
  className,
  mode,
}) => {
  const { pending, mutate } = useApiMutation(api.board.remove);
  const { onOpen } = useRenameModal();
  const router = useRouter();
  const { theme, setTheme } = useTheme();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const handleDialogItemOpenChange = (open: boolean) => {
    if (!open) setDropdownOpen(false);
  };

  const onCopyLink = () => {
    navigator.clipboard
      .writeText(`${window.location.origin}/board/${id}`)
      .then(() => toast.success(LINK_COPY_SUCCESS))
      .catch(() => toast.error(FAILED_COPY_LINK_ERROR));
  };

  const onDelete = () => {
    mutate({ id })
      .then(() => {
        toast.success(BOARD_DELETE_SUCCESS);
        if (redirectHomeOnDelete) router.push("/");
      })
      .catch((e) => toast.error(e.message));
  };

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent
        sideOffset={sideOffset}
        side={side}
        onClick={(e) => e.stopPropagation()}
        className={twMerge("w-60 dark:bg-zinc-800", className)}
      >
        {mode === EMode.Canvas && (
          <DropdownMenuItem
            className={"p-3 cursor-pointer"}
            onClick={() => {
              router.push("/");
            }}
          >
            <Image
              src={"/logo.svg"}
              alt={"logo"}
              width={16}
              height={16}
              className={"h-4 w-4 mr-2"}
            />
            Home
          </DropdownMenuItem>
        )}
        {mode !== EMode.Canvas && (
          <DropdownMenuItem
            className={"p-3 cursor-pointer"}
            onClick={onCopyLink}
          >
            <Link2 className={"h-4 w-4 mr-2"} />
            Copy board link
          </DropdownMenuItem>
        )}
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
            variant="ghostCanvas"
            className="p-3 h-11 cursor-pointer text-sm w-full justify-start font-normal"
          >
            <Trash2 className={"h-4 w-4 mr-2"} />
            Delete
          </Button>
        </ConfirmModal>
        {mode === EMode.Canvas && (
          <>
            <div className={"px-3 my-2 w-full h-1.5 bg-slate-400/10"} />
            <DropdownMenuItem className={"p-3 cursor-pointer"}>
              <a
                className={
                  "flex items-center text-primary underline-offset-4 hover:underline"
                }
                href={GITHUB_LINK}
              >
                <Github className={"h-4 w-4 mr-2"} />
                GitHub
              </a>
            </DropdownMenuItem>
            <DropdownMenuItem className={"p-3 cursor-pointer"}>
              <a
                className={
                  "flex items-center text-primary underline-offset-4 hover:underline"
                }
                href={PORTFOLIO_LINK}
              >
                <Briefcase className={"h-4 w-4 mr-2"} />
                Portfolio
              </a>
            </DropdownMenuItem>
            <div className={"px-3 my-2 w-full h-1.5 bg-slate-400/10"} />
            <DropdownMenuItem
              className={"p-3 cursor-pointer capitalize"}
              onClick={() => {
                const switchThemeTo = theme === "dark" ? "light" : "dark";
                setTheme(switchThemeTo);
              }}
            >
              {theme === "dark" ? (
                <Moon className={"h-4 w-4 mr-2"} />
              ) : (
                <Sun className={"h-4 w-4 mr-2"} />
              )}
              {theme}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
