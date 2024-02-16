import { create } from "zustand";
import { Id } from "@/convex/_generated/dataModel";

interface IDefaultValues {
  id: Id<"boards">;
  title: string;
}

const defaultValues: IDefaultValues = { id: "" as Id<"boards">, title: "" };

interface IRenameModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

export const useRenameModal = create<IRenameModal>((set) => ({
  isOpen: false,
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initialValues: { id: id as Id<"boards">, title },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialValues: defaultValues,
    }),
  initialValues: defaultValues,
}));
