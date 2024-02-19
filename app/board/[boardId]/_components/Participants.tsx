import React from "react";
import { User } from "lucide-react";

export const Participants: React.FC = () => {
  return (
    <div
      className={
        "absolute top-2 right-2 bg-white rounded-md p-3 h-12 flex items-center shadow-md"
      }
    >
      <User />
      <User />
      <User />
    </div>
  );
};
