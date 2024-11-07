const BASE_URL = "http://localhost:8080/api/search-books?q="

export const getBooks = async (query, page, maxResults = 10) => {
    const queries = query.split(" ").join("+");
  try {
    const res = await fetch(`${BASE_URL}${queries}&startIndex=${page}&maxResults=${maxResults}`);

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