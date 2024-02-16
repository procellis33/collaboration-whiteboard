"use client";

import { useRenameModal } from "@/store/useRenameModal";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
  const { mutate, pending } = useApiMutation(api.board.update);

  const { isOpen, onClose, initialValues } = useRenameModal();

  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  }, [initialValues.title]);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();

    if (initialValues.title === title) {
      onClose();
      return;
    }

    mutate({ id: initialValues.id, title: title })
      .then(() => {
        toast.success("Board renamed");
        onClose();
      })
      .catch((e) => toast.error(e.message));
  };

  // * Manual control without trigger.
  // * onOpenChange works only when DialogClose
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit board title</DialogTitle>
        </DialogHeader>
        <DialogDescription>Enter new title for this board</DialogDescription>
        <form onSubmit={onSubmit} className={"space-y-4"}>
          <Input
            disabled={pending}
            required
            maxLength={30}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={"Board title"}
            value={title}
          />
          <DialogFooter className={"gap-2"}>
            <DialogClose asChild>
              <Button type={"button"} variant={"outline"}>
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={pending} type={"submit"}>
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
