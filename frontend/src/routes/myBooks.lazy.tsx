import { Badge } from "@/components/badge/Badge";
import { BookCard } from "@/components/book/BookCard";
import { LoadingBubbles } from "@/components/loadings/LoadingBubbles";
import { useLikedBooks } from "@/hooks/useLikedBooks";
import { useAuth, useUser } from "@clerk/clerk-react";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/myBooks")({
  component: LikedBooks,
});

function LikedBooks() {
  const { getToken } = useAuth();
  const token = getToken();
  const { user } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  const { error, isLoading, isError, booksInfo, isBooksLoading, isBooksError } =
    useLikedBooks({ email, token });

  if (isLoading || isBooksLoading) {
    return <LoadingBubbles />;
  }

  if (isError || isBooksError) {
    return <Badge error = {error!}/>
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
              to={`/${book.id}`}
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
