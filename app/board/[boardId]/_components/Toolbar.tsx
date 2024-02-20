import React from "react";
import { Pencil, Circle, Square, PenLine, Undo, Redo } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hint } from "@/components/Hint";

export const Toolbar: React.FC = () => {
  return (
    <div
      className={
        "absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4"
      }
    >
      <div
        className={
          "bg-white rounded-md p-1 flex gap-y-0.5 flex-col items-center shadow-md"
        }
      >
        <Hint label={"Tool"} side={"right"} sideOffset={10} align={"center"}>
          <Button variant={"canvas"} className={"px-1.5"}>
            <Pencil />
          </Button>
        </Hint>

        <Hint label={"Tool"} side={"right"} sideOffset={10} align={"center"}>
          <Button variant={"canvas"} className={"px-1.5"}>
            <Circle />
          </Button>
        </Hint>

        <Hint label={"Tool"} side={"right"} sideOffset={10} align={"center"}>
          <Button variant={"canvas"} className={"px-1.5"}>
            <Square />
          </Button>
        </Hint>

        <Hint label={"Tool"} side={"right"} sideOffset={10} align={"center"}>
          <Button variant={"canvas"} className={"px-1.5"}>
            <PenLine />
          </Button>
        </Hint>
      </div>
      <div
        className={
          "bg-white rounded-md p-1 flex gap-y-0.5 flex-col items-center shadow-md"
        }
      >
        <Hint label={"Tool"} side={"right"} sideOffset={10} align={"center"}>
          <Button variant={"canvas"} className={"px-1.5"}>
            <Undo />
          </Button>
        </Hint>

        <Hint label={"Tool"} side={"right"} sideOffset={10} align={"center"}>
          <Button variant={"canvas"} className={"px-1.5"}>
            <Redo />
          </Button>
        </Hint>
      </div>
    </div>
  );
};

export const ToolbarSkeleton: React.FC = () => {
  return (
    <div
      className={
        "absolute top-[50%] -translate-y-[50%] left-2 flex flex-col gap-y-4 w-[52px] animate-pulse"
      }
    >
      <div
        className={
          "bg-white rounded-md p-1 flex gap-y-0.5 flex-col items-center shadow-md h-[360px]"
        }
      />
      <div
        className={
          "bg-white rounded-md p-1 flex gap-y-0.5 flex-col items-center shadow-md h-[80px]"
        }
      />
    </div>
  );
};
