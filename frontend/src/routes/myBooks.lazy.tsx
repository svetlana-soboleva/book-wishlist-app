import { fetchLikedBooks } from "@/api";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "@tanstack/react-query";
import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/myBooks")({
  component: LikedBooks,
});

function LikedBooks() {
  const { user } = useUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["likedBooks", email],
    queryFn: () => fetchLikedBooks(email),
    enabled: !!email,
  });
  console.log(data);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <div>
      <h1>Liked Books</h1>
      <ul>
        {data.map((book) => (
          <li key={book.bookId}>
            <p>{}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
