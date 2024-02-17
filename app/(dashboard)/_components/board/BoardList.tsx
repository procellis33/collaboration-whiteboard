import React from "react";
import { EmptyState } from "@/app/(dashboard)/_components/emptyStates/EmptyState";
import { EmptyData } from "@/app/(dashboard)/_components/emptyStates/EmptyData";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { BoardCard } from "@/app/(dashboard)/_components/board/boardCard/BoardCard";
import { NewOrgButton } from "@/app/(dashboard)/_components/board/NewOrgButton";

interface IBoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

export const BoardList: React.FC<IBoardListProps> = ({ orgId, query }) => {
  const data = useQuery(api.boards.get, {
    orgId,
    favorites: !!query.favorites,
  });

  // * Null if data doesn't exist. Undefined in convex is for loading state only
  if (data === undefined) {
    return (
      <div>
        <h2 className={"text-3xl"}>
          {query.favorites ? "Favorite boards" : "Team boards"}
        </h2>
        <div
          className={
            "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10"
          }
        >
          <NewOrgButton orgId={orgId} disabled />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

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
      <h2 className={"text-3xl"}>
        {query.favorites ? "Favorite boards" : "Team boards"}
      </h2>
      <div
        className={
          "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10"
        }
      >
        <NewOrgButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            orgId={board.orgId}
            authorId={board.authorId}
            authorName={board.authorName}
            createdAt={board._creationTime}
            imageUrl={board.imageUrl}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};
