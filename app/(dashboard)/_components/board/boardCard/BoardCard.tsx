import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Overlay } from "@/app/(dashboard)/_components/board/boardCard/Overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Footer } from "@/app/(dashboard)/_components/board/boardCard/Footer";
import { Skeleton } from "@/components/ui/skeleton";

interface IBoardCardProps {
  id: string;
  title: string;
  authorName: string;
  authorId: string;
  createdAt: number;
  imageUrl: string;
  orgId: string;
  isFavorite: boolean;
}

export const BoardCard: React.FC<IBoardCardProps> & { Skeleton: React.FC } = ({
  id,
  authorId,
  authorName,
  isFavorite,
  createdAt,
  imageUrl,
  orgId,
  title,
}) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorId ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, { addSuffix: true });

  return (
    <Link href={`/board/${id}`}>
      <div
        className={
          "group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden"
        }
      >
        <div className={"relative flex-1 bg-blue-50"}>
          <Image src={imageUrl} alt={title} fill />
          <Overlay />
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
  );
};

const BoardCardSkeleton: React.FC = () => {
  return (
    <div className={"aspect-[100/127] rounded-lg justify-between"}>
      <Skeleton className={"h-full w-full"} />
    </div>
  );
};

BoardCard.Skeleton = BoardCardSkeleton;
