import icon from "@/assets/onImgPlaceholder.png";
import { Book } from "@/api/types";
import { Link } from "@tanstack/react-router";
import { LikeBtn } from "../buttons/LikeBtn";
import { useUser } from "@clerk/clerk-react";

export const BookCard = ({
  book,
  to,
  params,
}: {
  book: Book;
  to: string;
  params: { bookId: string };
}) => {
  const { volumeInfo } = book;
  const { title, authors, pageCount, imageLinks } = volumeInfo;
  const thumbnail = imageLinks?.smallThumbnail || icon;

  const { user } = useUser();
  const username = user?.firstName;
  const email = user?.emailAddresses?.[0]?.emailAddress;

  return (
    <Link to={to} params={params}>
      <div className="w-40 flex flex-col justify-between bg-white shadow-md rounded-md p-1 border border-gray-200 hover:shadow-lg transition-shadow duration-200 hover:cursor-pointer">
        <img
          src={thumbnail}
          alt={`${title} cover`}
          className="scale-95 hover:scale-100 transition ease-in-out w-full h-40 object-cover object-top rounded mb-1"
        />
        <h2 className="text-xs font-bold mb-1 text-gray-900 truncate">
          {title}
        </h2>
        <p className="text-xs text-gray-700 truncate">
          {authors?.join(", ") || "Unknown Author"}
        </p>

        <div className="flex items-center justify-between mt-1">
          <LikeBtn
            size={10}
            user={{
              email: email as string,
              username: username as string,
            }}
            bookId={book.id}
          />
          <div className="flex items-center space-x-1 text-gray-600">
            {pageCount && (
              <p className="text-xs text-gray-700">{pageCount} pages</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
};
