import { Button } from "@/components/ui/button";
import { EmptyState } from "@/app/(dashboard)/_components/emptyStates/EmptyState";

export const EmptyData = () => {
  return (
    <EmptyState
      header={"Create your first board"}
      subheader={"Start by creating a board for your organization"}
      imageSrc={"/emptyData.svg"}
    >
      <Button className={"mt-6"} size={"lg"}>
        Create board
      </Button>
    </EmptyState>
  );
};
