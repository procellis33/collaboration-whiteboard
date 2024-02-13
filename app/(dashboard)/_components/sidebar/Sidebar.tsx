import React from "react";
import { CreateOrgButton } from "@/app/(dashboard)/_components/sidebar/CreateOrgButton";
import { MembershipList } from "@/app/(dashboard)/_components/sidebar/MembershipList";
const Sidebar: React.FC = () => {
  return (
    <aside
      className={
        "fixed z-[1] left-0 bg-indigo-950 h-full w-[60px] flex p-3 flex-col gap-y-4 text-white"
      }
    >
      <MembershipList />
      <CreateOrgButton />
    </aside>
  );
};

export default Sidebar;
