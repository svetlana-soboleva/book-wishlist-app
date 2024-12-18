import { FaChevronLeft } from "react-icons/fa";
import { filterString } from "@/utils";
import { Book } from "@/api/types";
import { LikeBtn } from "../buttons/LikeBtn";
import { useUser } from "@clerk/clerk-react";

export const BookPage = ({ bookData }: { bookData: Book }) => {
  const { user } = useUser();
  const username = user?.firstName;
  const email = user?.emailAddresses?.[0]?.emailAddress;

  return (
    <div className="grid grid-cols-1 pt-4 sm:grid-cols-2 sm:w-full bg-gradient-to-b from-white via-stone-50 to-stone-100 text-white rounded-lg mx-auto shadow-lg">
      <div className="flex flex-col  w-full">
        <div className="flex flex-row justify-between p-4 text-gray-800">
          <button className="items-center hover:text-gray-200 hover:cursor-pointer hidden">
            <FaChevronLeft size={30} />
          </button>

          <h1>Book details</h1>
          <LikeBtn
            size={30}
            user={{
              email: email as string,
              username: username as string,
            }}
            bookId={bookData.id}
          />
        </div>

        <div className="flex justify-center items-center p-8">
          <img
            src={bookData.volumeInfo.imageLinks?.large}
            alt={bookData.volumeInfo.title}
            className="rounded-lg shadow-lg w-full sm:w-72  object-cover"
          />
        </div>
      </div>

      <div className="mt-4 text-center space-y-4">
        <h1 className="text-2xl font-bold text-gray-700">
          {bookData.volumeInfo.title}{" "}
        </h1>
        <p className="text-sm text-gray-600">
          {bookData.volumeInfo.authors?.join(", ")}
        </p>

        <div className="flex justify-around text-gray-300 text-sm mt-4">
          <div className="text-center">
            <p className="font-bold text-xl">
              {bookData.volumeInfo.language.toLocaleUpperCase()}
            </p>
            <p>Language</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl">{bookData.volumeInfo.pageCount}</p>
            <p>Pages</p>
          </div>
          <div className="text-center">
            <p className="font-bold text-xl">
              {bookData.volumeInfo.publishedDate?.slice(0, 4)}
            </p>
            <p>Published</p>
          </div>
        </div>

        <div className="mt-6 p-2">
          <h2 className="font-semibold text-lg text-gray-700">
            About {bookData.volumeInfo.title}
          </h2>
          <p className="text-sm text-gray-600 mt-2 leading-relaxed text">
            {filterString(bookData.volumeInfo.description)}
          </p>
        </div>
      </div>
    </div>
  );
};
