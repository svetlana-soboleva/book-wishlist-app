import type { Book } from "../api/types";
import { createFileRoute, useLoaderData } from "@tanstack/react-router";
import { getBookInfo } from "../api";
import { Loading } from "../components/Loading";
import { filterString } from "../utils";

export const Route = createFileRoute("/$bookId")({
  loader: async ({ params }) => {
    return getBookInfo(params.bookId);
  },
  component: BookInfo,
});

function BookInfo() {
  const bookData: Book = useLoaderData({ from: "/$bookId" });

  if (!bookData) return <Loading />; 


  return (
   
    <div className="flex flex-col gap-2 items-center justify-center">
      <div className="avatar">
        <div className="w-72 rounded-xl">
          <img className="object-top" src={bookData.volumeInfo.imageLinks?.large} alt="" />
        </div>
      </div>
      <h2 className="text-md m-2 font-bold text-gray-900">{bookData.volumeInfo.title}</h2>
      <p className="text-gray-700 text-md">{bookData.volumeInfo.authors}</p>
<div className="flex flex-row gap-2">
    <p>{bookData.volumeInfo.language}</p>
    <p>{bookData.volumeInfo.pageCount}</p>
    <p>{bookData.volumeInfo.publishedDate}</p>
</div>
<div >
<p>{filterString(bookData.volumeInfo.description)}</p>
</div>
    </div>
   
  );
}
