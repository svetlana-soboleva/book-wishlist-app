import { FaHeart } from "react-icons/fa";
import icon from "@/assets/onImgPlaceholder.png";
import { Book } from "@/api/types";
import { Link } from "@tanstack/react-router";

export const BookCard = ({
  book,
  to,
  params,
}: {
  book: Book;
  to: string;
  params: { bookId: string };
}) => {
  const { selfLink, volumeInfo } = book;
  const { title, authors, pageCount, imageLinks } = volumeInfo;

  const thumbnail = imageLinks?.smallThumbnail || icon;

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
          <button className="flex items-center text-gray-500 text-xs hover:text-red-500 hover:cursor-pointer">
            <FaHeart />
          </button>
          <div className="flex items-center space-x-1 text-gray-600">
            {pageCount && (
              <p className="text-xs text-gray-700">{pageCount} pages</p>
            )}
            <a href={selfLink} target="_blank" rel="noopener noreferrer">
              {/* <FaBookOpen className="w-4 h-4" /> */}
            </a>
          </div>
        </div>
      </div>
    </Link>
  );
};
