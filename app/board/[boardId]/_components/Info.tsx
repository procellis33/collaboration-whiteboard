import React from "react";
import Image from "next/image";
import { Hint } from "@/components/Hint";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { AlignJustify } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const Info: React.FC = () => {
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

      <Hint label={"Board settings"} side={"bottom"} sideOffset={10}>
        <Button asChild variant={"canvas"} className={"px-2"}>
          <div className={"text-lg text-black"}>Title</div>
        </Button>
      </Hint>

      <Separator orientation={"vertical"} className={"h-7 mr-2 ml-2"} />

      <Hint label={"Main menu"} side={"bottom"} sideOffset={10}>
        <Button asChild variant={"canvas"} className={"px-2"}>
          <AlignJustify width={38} />
        </Button>
      </Hint>
    </div>
  );
};
