import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "@/components/Search";
import { useState } from "react";
import { BookCard } from "@/components/book/BookCard";
import { LoadingBubbles } from "@/components/loadings/LoadingBubbles";
import Pagination from "@/components/pagination/Pagination";
import { useBooks } from "@/hooks/useBooks";
import { Badge } from "@/components/badge/Badge";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => {
    return {
      query: search.query as string,
    };
  },
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const { query } = Route.useSearch();
  const [searchQuery, setSearchQuery] = useState(query);
  const [page, setPage] = useState(0);

  const { isError, error, data, isFetching } = useBooks({ searchQuery, page });

  const onSearchChange = (value: string) => {
    setSearchQuery(value);
    setPage(0);
    navigate({
      to: "/",
      search: { query: value },
    });
  };

  return (
    <div className="p-2 flex flex-col gap-16 justify-center items-center">
      <Search onSearchChange={onSearchChange} />
      <div>
        {isError ? (
          <Badge error={error!} />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {data?.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                to="/$bookId"
                params={{ bookId: book.id }}
              />
            ))}
          </div>
        )}
      </div>
      {data ? <Pagination page={page} setPage={setPage} /> : null}
      {isFetching ? <LoadingBubbles /> : null}
    </div>
  );
}
