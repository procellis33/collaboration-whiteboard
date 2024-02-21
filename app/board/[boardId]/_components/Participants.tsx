"use client";
import React from "react";
import { UserAvatar } from "@/app/board/[boardId]/_components/userAvatar";
import { useOthers, useSelf } from "@/liveblocks.config";
import { idToColor } from "@/lib/utils/idToColor";

const MAX_OTHERS_SHOWN_USERS = 2;

export const Participants: React.FC = () => {
  const currentUser = useSelf();
  const users = useOthers();
  const hasMoreUsers = users.length > MAX_OTHERS_SHOWN_USERS;
  return (
    <div
      className={
        "absolute top-2 right-2 bg-white rounded-md p-3 h-[2.85rem] flex items-center shadow-md"
      }
    >
      <div className={"flex gap-x-2"}>
        {users
          .slice(0, MAX_OTHERS_SHOWN_USERS)
          .map(({ connectionId, info }) => {
            return (
              <UserAvatar
                key={connectionId}
                src={info?.picture}
                name={info?.name}
                fallback={info?.name?.[0] || "A"}
                borderColor={idToColor(connectionId)}
              />
            );
          })}
        {currentUser && (
          <UserAvatar
            src={currentUser.info?.picture}
            name={`${currentUser.info?.name} (You)`}
            fallback={currentUser.info?.name?.[0]}
            borderColor={idToColor(currentUser.connectionId)}
          />
        )}
        {hasMoreUsers && (
          <UserAvatar
            name={`${users.length - MAX_OTHERS_SHOWN_USERS} more`}
            fallback={`+${users.length - MAX_OTHERS_SHOWN_USERS}`}
          />
        )}
      </div>
    </div>
  );
};

export const ParticipantsSkeleton: React.FC = () => {
  return (
    <div
      className={
        "absolute top-2 right-2 bg-white rounded-md p-3 h-[2.85rem] flex items-center shadow-md w-[70px] sm:w-[100px] animate-pulse"
      }
    />
  );
};
