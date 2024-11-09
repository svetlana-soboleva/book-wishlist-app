import { toggleWishList } from "@/api";
import { User } from "@/api/types";
import { useMutation } from "@tanstack/react-query";
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
  const toggleWishlistMutation = useMutation({
    mutationFn: () => toggleWishList(user, bookId),
  });

  const handleLike = () => {
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
