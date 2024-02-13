import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Hint } from "@/components/Hint";

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
        <CreateOrganization
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                width: "100%",
              },
              card: {
                width: "unset",
                maxWidth: "unset",
                flex: 1,
                backgroundColor: "transparent",
                boxShadow: "unset",
              },
            },
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
