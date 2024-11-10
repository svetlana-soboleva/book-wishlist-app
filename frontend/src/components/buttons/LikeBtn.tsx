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
  return (
    <button
      onClick={handleLike}
      className="flex items-center text-gray-500 text-xs hover:text-red-500 hover:cursor-pointer"
    >
      <FaHeart size={size} />
    </button>
  );
};
