import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils/twMerge";
import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { Hint } from "@/components/Hint";

interface IItemProps {
  id: string;
  name: string;
  imageUrl: string;
}

export const Item: React.FC<IItemProps> = ({ id, name, imageUrl }) => {
  const { organization } = useOrganization();
  const { setActive } = useOrganizationList();

  const isActive = organization?.id === id;

  const onClick = () => {
    if (!setActive) return;

    setActive({ organization: id });
  };

  return (
    <div className={"aspect-square relative"}>
      <Hint
        label={name}
        side={"right"}
        align={"start"}
        sideOffset={15}
        alignOffset={1}
      >
        <Image
          alt={name}
          src={imageUrl}
          fill
          onClick={onClick}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition object-contain",
            isActive && "opacity-100",
          )}
        />
      </Hint>
    </div>
  );
};
