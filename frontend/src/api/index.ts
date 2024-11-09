const BASE_SEARCH_URL = import.meta.env.VITE_BASE_SEARCH_URL;
const BASE_SEARCH_INFO = import.meta.env.VITE_BASE_SEARCH_INFO;

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
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching books:", error);
    return null;
  }
};
