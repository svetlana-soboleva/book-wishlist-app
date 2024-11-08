import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "../components/Search";
import { useQuery } from "@tanstack/react-query";
import { getBooks } from "../api";
import { useState } from "react";
import { BookCard } from "../components/BookCard";
import { Book } from "../api/types";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);

  const { isError, error, data, isFetching } = useQuery<Book[]>({
    queryKey: ["books", searchQuery, page],
    queryFn: () => getBooks(searchQuery, page),
    enabled: !!searchQuery,
  });
  const onSearchChange = (value: string) => {
    setSearchQuery(value);
    navigate({
      to: "/",
      search: { query: value },
    });
  };

  return (
    <div className="p-2 flex flex-col gap-4 justify-center items-center">
      <Search onSearchChange={onSearchChange} />
      <div>
        {isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            {data?.map((book) => <BookCard key={book.id} book={book} />)}
          </div>
        )}
      </div>
      {data ? (
        <div className="join grid grid-cols-3">
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 0}
            className="join-item btn"
          >
            Previous page
          </button>
          <button className="join-item btn btn-disabled">{page}</button>
          <button
            onClick={() => setPage((old) => old + 1)}
            className="join-item btn"
          >
            Next
          </button>
        </div>
      ) : null}
      {isFetching ? (
        <div>
          <span className="loading loading-ring loading-xs"></span>
          <span className="loading loading-ring loading-sm"></span>
          <span className="loading loading-ring loading-md"></span>
          <span className="loading loading-ring loading-lg"></span>
        </div>
      ) : null}
    </div>
  );
}
