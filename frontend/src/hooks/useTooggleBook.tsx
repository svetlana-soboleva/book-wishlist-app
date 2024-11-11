import { toggleWishList } from "@/api";
import { useAuth } from "@clerk/clerk-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { User } from "@/api/types";
import { useState } from "react";

export const useTooggleBook = ({
  user,
  bookId,
}: {
  user: User;
  bookId: string;
}) => {
  const queryClient = useQueryClient();

  const { getToken } = useAuth();
  const token = getToken();

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const toggleWishlistMutation = useMutation({
    mutationFn: () => toggleWishList(user, bookId, token),
    onMutate: async () => {
      await queryClient.cancelQueries({ queryKey: ["likedBooks", user.email] });
      const previousLikedBooks = queryClient.getQueryData<{ bookId: string }[]>(
        ["likedBooks", user.email]
      );
      queryClient.setQueryData<{ bookId: string }[]>(
        ["likedBooks", user.email],
        (old) =>
          isLiked
            ? old?.filter((book) => book.bookId !== bookId) || []
            : [...(old || []), { bookId }]
      );
      return { previousLikedBooks };
    },
    onError: (err, _, context) => {
      if (context?.previousLikedBooks) {
        queryClient.setQueryData(
          ["likedBooks", user.email],
          context.previousLikedBooks
        );
      }
      setError(err.message);
    },
    onSuccess: () => {
      setSuccess("Successfully updated liked books!");
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["likedBooks", user.email] });
    },
  });

  const likedBooks = queryClient.getQueryData<{ bookId: string }[]>([
    "likedBooks",
    user.email,
  ]);

  const isLiked = likedBooks
    ? likedBooks.some((book) => book.bookId === bookId)
    : false;

  return {
    toggleWishlistMutation,
    isLiked,
    error,
    success,
    setError,
    setSuccess,
  };
};
