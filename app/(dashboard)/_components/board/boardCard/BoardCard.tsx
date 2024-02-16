import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Overlay } from "@/app/(dashboard)/_components/board/boardCard/Overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { Footer } from "@/app/(dashboard)/_components/board/boardCard/Footer";
import { Skeleton } from "@/components/ui/skeleton";
import { Actions } from "@/components/Actions";
import { MoreHorizontal } from "lucide-react";
import { Id } from "@/convex/_generated/dataModel";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "@/convex/_generated/api";
import { toast } from "sonner";

interface IBoardCardProps {
  id: Id<"boards">;
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
  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.addFavorite,
  );
  const { mutate: onRemoveFavorite, pending: pendingRemoveFavorite } =
    useApiMutation(api.board.removeFavorite);

  const toggleFavorite = () => {
    if (isFavorite)
      onRemoveFavorite({ id }).catch((e) => toast.error(e.message));
    else onFavorite({ id, orgId }).catch((e) => toast.error(e.message));
  };

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
          <Image src={imageUrl} alt={title} fill priority />
          <Overlay />
          <Actions id={id} title={title} side={"right"}>
            <button
              className={
                "absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity px-3 py-2 outline-none"
              }
            >
              <MoreHorizontal
                className={
                  "text-white opacity-75 hover:opacity-100 transition-opacity"
                }
              />
            </button>
          </Actions>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={toggleFavorite}
          disabled={pendingFavorite || pendingRemoveFavorite}
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
