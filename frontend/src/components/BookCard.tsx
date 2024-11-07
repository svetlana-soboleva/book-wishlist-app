import { FaHeart } from "react-icons/fa";
import icon from "../assets/onImgPlaceholder.png";
import { formatDate } from "../utils";
import { Book } from "../api/types";

export const BookCard = ({ book }: { book: Book }) => {
  const { selfLink, volumeInfo } = book;
  const { title, authors, publishedDate, pageCount, imageLinks } = volumeInfo;

  const thumbnail = imageLinks?.smallThumbnail || icon;

  return (
    <div className="flex flex-col justify-between bg-white shadow-md rounded-md p-2 border border-gray-200 hover:shadow-lg transition-shadow duration-200 w-32">
      <img
        src={thumbnail}
        alt={`${title} cover`}
        className="w-full h-28 object-cover rounded mb-1"
      />
      <h2 className="text-xs font-bold mb-1 text-gray-900 truncate">{title}</h2>
      <p className="text-xs text-gray-700 truncate">
        {authors?.join(", ") || "Unknown Author"}
      </p>
      <p className="text-xs text-gray-600 mb-1">
        <strong>Published:</strong> {formatDate(publishedDate)}
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
  );
};
