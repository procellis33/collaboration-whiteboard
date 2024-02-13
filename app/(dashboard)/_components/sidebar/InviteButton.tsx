import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { OrganizationProfile } from "@clerk/nextjs";

export const InviteButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <Plus className={"h-4 w-4 me-2"} />
          Invite members
        </Button>
      </DialogTrigger>
      <DialogContent className={"p-0 border-none max-w-[880px] bg-white"}>
        <OrganizationProfile
          appearance={{
            elements: {
              rootBox: {
                display: "flex",
                justifyContent: "center",
                // alignItems: "center",
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
