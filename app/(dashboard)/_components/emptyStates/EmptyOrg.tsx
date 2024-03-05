import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CustomCreateOrg } from "@/app/(dashboard)/_components/clerkCustom/CustomCreateOrg";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/app/(dashboard)/_components/emptyStates/EmptyState";

export const EmptyOrg = () => {
  return (
    <EmptyState
      header={"Welcome to CoBoard"}
      subheader={"Create an organization to get started"}
      imageSrc={"/emptyCase.svg"}
    >
      <Dialog>
        <DialogTrigger asChild className={"mt-6"}>
          <Button size={"lg"}>Create organization</Button>
        </DialogTrigger>
        <DialogContent
          className={"p-0 border-none max-w-[480px] bg-white dark:bg-zinc-900"}
        >
          <CustomCreateOrg />
        </DialogContent>
      </Dialog>
    </EmptyState>
  );
};
