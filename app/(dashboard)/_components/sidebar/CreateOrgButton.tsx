import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "@/components/Hint";
import { CustomCreateOrg } from "@/app/(dashboard)/_components/clerkCustom/CustomCreateOrg";

export const CreateOrgButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className={"aspect-square"}>
          <Hint
            label={"Create organization"}
            side={"right"}
            align={"start"}
            sideOffset={15}
            alignOffset={1}
          >
            <button
              className={
                "bg-white/25 h-full w-full rounded-md flex items-center justify-center opacity-60 hover:opacity-100 transition"
              }
            >
              <Plus className={"text-white"} />
            </button>
          </Hint>
        </div>
      </DialogTrigger>
      <DialogContent className={"p-0 border-none max-w-[480px] bg-white"}>
        <CustomCreateOrg />
      </DialogContent>
    </Dialog>
  );
};
