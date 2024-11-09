import { User } from "./types";

const BASE_SEARCH_URL = import.meta.env.VITE_BASE_SEARCH_URL;
const BASE_SEARCH_INFO = import.meta.env.VITE_BASE_SEARCH_INFO;
const BASE_ADD_WISHLIST = import.meta.env.VITE_BASE_ADD_WISHLIST;

export const getBooks = async (
  query: string,
  page: number,
  maxResults = 12
) => {
  const queries = query.split(" ").join("+");
  try {
    const res = await fetch(
      `${BASE_SEARCH_URL}${queries}&startIndex=${page}&maxResults=${maxResults}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
};

export const getBookInfo = async (id: string) => {
  try {
    const res = await fetch(`${BASE_SEARCH_INFO}${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      throw new Error(`Error: ${res.status} ${res.statusText}`);
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
};

export const toggleWishList = async(user: User, bookId: string ) => {
  const res = await fetch(
    `${BASE_ADD_WISHLIST}${bookId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user)
    }
  );
  console.log(await res.json())
  return res.json()
}