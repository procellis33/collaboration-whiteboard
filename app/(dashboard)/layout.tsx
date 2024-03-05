import React from "react";

import OrganisationSidebar from "@/app/(dashboard)/_components/OrganisationSidebar";
import Navbar from "@/app/(dashboard)/_components/Navbar";

interface IDashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<IDashboardLayoutProps> = ({ children }) => {
  return (
    <main className={"h-full"}>
      <div className={"flex gap-x-3 h-full dark:bg-zinc-900"}>
        <OrganisationSidebar />
        <div className={"h-full flex-1"}>
          <Navbar />
          {children}
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
