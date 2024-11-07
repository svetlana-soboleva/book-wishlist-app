import { createLazyFileRoute } from "@tanstack/react-router";
import { Search } from "../components/Search";
import { useQuery } from "@tanstack/react-query";
import { getBooks, getTheNewestBooks } from "../api";
import { useState } from "react";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(0);

  const { isPending, isError, error, data, isFetching } = useQuery({
    queryKey: ["books", searchQuery, page],
    queryFn: () => getBooks(searchQuery, page),
    enabled: !!searchQuery,
  });
  const onSearchChange = (value: string) => {
    setSearchQuery(value);
  };

  return (
    <div className="p-2">
      <Search onSearchChange={onSearchChange} />
      <div>
        {isError ? (
          <div>Error: {error.message}</div>
        ) : (
          <div>
            {data?.map((book) => (
              <p key={book.id}>{book.volumeInfo.title}</p> 
            ))}
          </div>
        )}
      </div>
      {data? (<div className="join">
        <button onClick={() => setPage((old) => Math.max(old - 1, 0))}
        disabled={page === 0} className="join-item btn">Previous page</button>
        <button className="join-item btn btn-disabled">{page}</button>
        <button onClick={() => setPage((old) => old + 1)} className="join-item btn">Next</button>
      </div>) : null}
      {isFetching ? <span> Loading...</span> : null}  
    </div>
  );
}
