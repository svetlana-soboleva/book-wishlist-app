import { fetchLikedBooks, getBookInfo } from "@/api";
import { useQuery } from "@tanstack/react-query";


export const useLikedBooks = ({email, token}  : {email: string | undefined, token : Promise<string | null>}) => {
  

  const {
    data: likedBooksIds,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["likedBooks", email],
    queryFn: () => fetchLikedBooks(email, token),
    enabled: !!email,
  });

  const {
    data: booksInfo,
    isLoading: isBooksLoading,
    isError: isBooksError,
  } = useQuery({
    queryKey: ["booksInfo", likedBooksIds],
    queryFn: async () => {
      if (!likedBooksIds || likedBooksIds.length === 0) return [];
      const booksDetails = await Promise.all(
        likedBooksIds.map((book: { bookId: string }) =>
          getBookInfo(book.bookId)
        )
      );
      return booksDetails;
    },
    enabled: !!likedBooksIds,
  });

  return {error,
    isLoading,
    isError,
    booksInfo,
    isBooksLoading,
    isBooksError
}
}
