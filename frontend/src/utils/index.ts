export const formatDate = (dateString?: string) => {
  if (!dateString) return "N/A";
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString(undefined, options);
};

export const filterString = (str: string) => {
  return str.replace(/<\/?[^>]+(>|$)/g, "").trim();
};
