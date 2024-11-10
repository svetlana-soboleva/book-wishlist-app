import { toggleWishList } from "@/api";
import { User } from "@/api/types";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FaHeart } from "react-icons/fa";

export const LikeBtn = ({
  size,
  user,
  bookId,
}: {
  size: number;
  user: User;
  bookId: string;
}) => {
  const queryClient = useQueryClient();
  const { getToken } = useAuth();
  const token = getToken();

  const toggleWishlistMutation = useMutation({
    mutationFn: () => toggleWishList(user, bookId, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["likedBooks"] });
    },
  });

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleWishlistMutation.mutate();
  };

  const likedBooks = queryClient.getQueryData<{ bookId: string }[]>([
    "likedBooks",
    user.email,
  ]);
  const isLiked = likedBooks
    ? likedBooks.some((book) => book.bookId === bookId)
    : false;

  return (
    <button
      onClick={handleLike}
      className={`flex items-center text-xs hover:cursor-pointer hover:text-red-500 ${
        isLiked ? "text-red-500" : "text-gray-500"
      }`}
    >
      <FaHeart size={size} />
    </button>
  );
};
