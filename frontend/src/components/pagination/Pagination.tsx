import React from "react";

interface PaginationProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const Pagination: React.FC<PaginationProps> = ({ page, setPage }) => {
  const goToPreviousPage = () => setPage((old) => Math.max(old - 1, 0));
  const goToNextPage = () => setPage((old) => old + 1);

  return (
    <div className="join grid grid-cols-3">
      <button
        onClick={goToPreviousPage}
        disabled={page === 0}
        className="join-item btn"
      >
        Previous page
      </button>
      <button className="join-item btn btn-disabled">{page + 1}</button>
      <button onClick={goToNextPage} className="join-item btn">
        Next
      </button>
    </div>
  );
};

export default Pagination;
