"use client";

import React from "react";
import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { AlignJustify } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Actions } from "@/components/Actions";

interface IInfoProps {
  boardId: string;
}

export const Info: React.FC<IInfoProps> = ({ boardId }) => {
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });

  if (!data) return <InfoSkeleton />;

  return (
    <div
      className={
        "absolute top-2 left-2 bg-white rounded-md px-canvas h-canvas shadow-md flex items-center"
      }
    >
      <Actions
        id={data._id}
        title={data.title}
        side={"right"}
        className={"mt-2"}
        sideOffset={10}
        redirectHomeOnDelete
      >
        <div>
          <Hint label={"Main menu"} side={"right"} sideOffset={10}>
            <Button asChild variant={"canvas"} size={"icon"} className={"px-2"}>
              <AlignJustify />
            </Button>
          </Hint>
        </div>
      </Actions>
    </div>
  );
};

export const InfoSkeleton: React.FC = () => {
  return (
    <div
      className={
        "absolute top-2 left-2 bg-white rounded-md px-canvas h-canvas shadow-md animate-pulse w-[47px]"
      }
    />
  );
};
