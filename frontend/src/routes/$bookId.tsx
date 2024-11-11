import type { Book } from "../api/types";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { getBookInfo } from "@/api";
import { Loading } from "@/components/loadings/LoadingCard";
import { BookPage } from "@/components/book/BookPage";

export const Route = createFileRoute("/$bookId")({
  loader: async ({ params }) => {
    return getBookInfo(params.bookId);
  },
  component: BookInfo,
});

function BookInfo() {
  const bookData: Book = useLoaderData({ from: "/$bookId" });

  if (!bookData) return <Loading />;

  return <BookPage bookData={bookData} />;
}
