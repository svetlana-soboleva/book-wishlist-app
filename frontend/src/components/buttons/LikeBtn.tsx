import { User } from "@/api/types";
import { useTooggleBook } from "@/hooks/useTooggleBook";
import { FaHeart } from "react-icons/fa";
import { Toast } from "../notification/Toast";
import { useEffect } from "react";

export const LikeBtn = ({
  size,
  user,
  bookId,
}: {
  size: number;
  user: User;
  bookId: string;
}) => {
  const {
    toggleWishlistMutation,
    isLiked,
    error,
    success,
    setError,
    setSuccess,
  } = useTooggleBook({ user, bookId });

  const handleLike = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    toggleWishlistMutation.mutate();
  };

  useEffect(() => {
    if (error || success) {
      const timeout = setTimeout(() => {
        setError(null);
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error, success, setError, setSuccess]);

  return (
    <>
      <button
        onClick={handleLike}
        className={`flex items-center text-xs hover:cursor-pointer hover:text-red-500 ${
          isLiked ? "text-red-500" : "text-gray-500"
        }`}
      >
        <FaHeart size={size} />
      </button>
      {error || success ? (
        <Toast error={error as string} success={success as string} />
      ) : null}
    </>
  );
};
