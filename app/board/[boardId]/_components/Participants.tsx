import React from "react";
import { User } from "lucide-react";

export const Participants: React.FC & { Skeleton: React.FC } = () => {
  return (
    <div
      className={
        "absolute top-2 right-2 bg-white rounded-md p-3 h-[2.85rem] flex items-center shadow-md"
      }
    >
      <User />
      <User />
      <User />
    </div>
  );
};

const ParticipantsSkeleton = () => {
  return (
    <div
      className={
        "absolute top-2 right-2 bg-white rounded-md p-3 h-[2.85rem] flex items-center shadow-md w-[70px] sm:w-[100px] animate-pulse"
      }
    />
  );
};

Participants.Skeleton = ParticipantsSkeleton;
