import { Hint } from "@/components/Hint";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface IUserAvatarProps {
  src?: string;
  name?: string;
  fallback?: string;
  borderColor?: string;
}

export const UserAvatar: React.FC<IUserAvatarProps> = ({
  src,
  name,
  fallback,
  borderColor,
}) => {
  return (
    <Hint label={name || "Anonymous"} side={"bottom"} sideOffset={12}>
      <Avatar className={"h-8 w-8 border-2"} style={{ borderColor }}>
        <AvatarImage src={src} />
        <AvatarFallback className={"text-xs font-semibold"}>
          {fallback}
        </AvatarFallback>
      </Avatar>
    </Hint>
  );
};
