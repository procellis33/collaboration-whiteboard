import React from "react";
import { EmptyState } from "@/app/(dashboard)/_components/emptyStates/EmptyState";
import { EmptyData } from "@/app/(dashboard)/_components/emptyStates/EmptyData";

interface IBoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList: React.FC<IBoardListProps> = ({ orgId, query }) => {
  const data = [];

  if (!data?.length && query.search)
    return (
      <EmptyState
        header={"No results found"}
        subheader={"Try searching for something else"}
        imageSrc={"/emptySearch.svg"}
      />
    );

  if (!data?.length && query.favorites)
    return (
      <EmptyState
        header={"No favorite boards"}
        subheader={"Start by adding some favorites"}
        imageSrc={"/emptyFavorites.svg"}
      />
    );

  if (!data?.length) return <EmptyData />;

  return (
    <div>
      <>{JSON.stringify(query)}</>
    </div>
  );
};
