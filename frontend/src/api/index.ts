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
  throw Error("boo")
  const queries = query.split(" ").join("+");
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
};

export const getBookInfo = async (id: string) => {
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
};

export const toggleWishList = async (
  user: User | null,
  bookId: string,
  token: Promise<string | null>
) => {
  if (!user || !user.email) {
    throw new Error("User is not signed in. Please log in to continue.");
  }
  const resolvedToken = await token;
  if (!resolvedToken) {
    throw new Error(
      "Authorization token is missing. Please log in to continue."
    );
  }

  const res = await fetch(`${BASE_ADD_WISHLIST}/${bookId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${await token}`,
    },
    body: JSON.stringify(user),
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
