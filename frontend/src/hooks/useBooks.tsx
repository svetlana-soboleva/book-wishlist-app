import { getBooks } from "@/api";
import { Book } from "@/api/types";
import { useQuery } from "@tanstack/react-query";

export const useBooks = ({searchQuery, page}: {searchQuery: string, page : number}) => {
    const { isError, error, data, isFetching } = useQuery<Book[]>({
        queryKey: ["books", searchQuery, page],
        queryFn: () => getBooks(searchQuery, page),
        enabled: !!searchQuery,
      });
      return {isError, error, data, isFetching }
}
