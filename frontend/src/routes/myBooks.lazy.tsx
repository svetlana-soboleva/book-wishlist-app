import { fetchLikedBooks, getBookInfo } from "@/api";
import { BookCard } from "@/components/book/BookCard";
import { LoadingBubbles } from "@/components/loading/LoadingBubbles";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/myBooks")({
  component: LikedBooks,
});

function LikedBooks() {
  const { user } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  const {
    data: likedBooksIds,
    error,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["likedBooks", email],
    queryFn: () => fetchLikedBooks(email),
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

  if (isLoading || isBooksLoading) {
    return <LoadingBubbles />;
  }

  if (isError || isBooksError) {
    return <p>Error: {error?.message || "Failed to fetch book details."}</p>;
  }

  return (
    <div>
      <h1 className="text-lg my-4">To Read:</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {booksInfo && booksInfo.length > 0 ? (
          booksInfo.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              to={`/book/${book.id}`}
              params={{ bookId: book.id }}
            />
          ))
        ) : (
          <p>No books found.</p>
        )}
      </div>
    </div>
  );
}
