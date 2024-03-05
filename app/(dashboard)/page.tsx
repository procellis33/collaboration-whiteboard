"use client";
import { EmptyOrg } from "@/app/(dashboard)/_components/emptyStates/EmptyOrg";
import { useOrganization } from "@clerk/nextjs";
import React from "react";
import { BoardList } from "@/app/(dashboard)/_components/board/BoardList";

interface IDashboardPageProps {
  searchParams: {
    search?: string;
    favorites?: string;
  };
}

const DashboardPage: React.FC<IDashboardPageProps> = ({ searchParams }) => {
  const { organization } = useOrganization();

  return (
    <div className={"flex-1 h-[calc(100%-86px)] p-6"}>
      {!organization ? (
        <EmptyOrg />
      ) : (
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  );
};

export default DashboardPage;
