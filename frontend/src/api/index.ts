import { User } from "./types";

const BASE_SEARCH_URL = import.meta.env.VITE_BASE_SEARCH_URL;
const BASE_SEARCH_INFO = import.meta.env.VITE_BASE_SEARCH_INFO;
const BASE_ADD_WISHLIST = import.meta.env.VITE_BASE_ADD_WISHLIST;
const BASE_GET_LIKED_BOOKS = import.meta.env.VITE_BASE_GET_LIKED_BOOKS;

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

export const toggleWishList = async (
  user: User,
  bookId: string,
  token: Promise<string | null>
) => {
  const res = await fetch(`${BASE_ADD_WISHLIST}/${bookId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token}`,
    },
    body: JSON.stringify(user),
    // mode: "no-cors",
  });
  return res.json();
};

export const fetchLikedBooks = async (
  email: string | undefined,
  token: Promise<string | null>
) => {
  try {
    const response = await fetch(`${BASE_GET_LIKED_BOOKS}${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${await token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Error: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return [];
  }
};
