"use client";

import React from "react";
import Image from "next/image";
import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { AlignJustify } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useRenameModal } from "@/store/useRenameModal";
import { Actions } from "@/components/Actions";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

interface IInfoProps {
  boardId: string;
}

export const Info: React.FC<IInfoProps> = ({ boardId }) => {
  const data = useQuery(api.board.get, { id: boardId as Id<"boards"> });
  const { onOpen } = useRenameModal();

  if (!data) return <InfoSkeleton />;

  return (
    <div
      className={
        "absolute top-2 left-2 bg-white rounded-md px-[0.225rem] h-[2.85rem] shadow-md flex items-center"
      }
    >
      <Hint label={"Go to boards"} side={"bottom"} sideOffset={10}>
        <Button asChild variant={"canvas"} className={"px-2"}>
          <Link href="/">
            <div className={"flex items-center gap-x-1"}>
              <Image src={"/logo.svg"} alt={"Logo"} height={40} width={40} />
              <span className={cn("font-semibold text-2xl", font.className)}>
                CoBoard
              </span>
            </div>
          </Link>
        </Button>
      </Hint>

      <Separator orientation={"vertical"} className={"h-7 mr-2 ml-2"} />

      <Hint label={"Rename board"} side={"bottom"} sideOffset={10}>
        <Button
          asChild
          variant={"canvas"}
          className={"px-2"}
          onClick={() => onOpen(data._id, data.title)}
        >
          <div className={"text-lg text-black"}>{data.title}</div>
        </Button>
      </Hint>

      <Separator orientation={"vertical"} className={"h-7 mr-2 ml-2"} />

      <Actions
        id={data._id}
        title={data.title}
        side={"bottom"}
        sideOffset={10}
        redirectHomeOnDelete
      >
        <div>
          <Hint label={"Main menu"} side={"bottom"} sideOffset={10}>
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
        "absolute top-2 left-2 bg-white rounded-md px-[0.225rem] h-[2.85rem] shadow-md flex items-center w-[100px] sm:w-[200px] md:w-[300px] animate-pulse"
      }
    />
  );
};
