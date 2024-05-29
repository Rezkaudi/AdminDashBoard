"use client"
import React, { useState } from "react";

const Pagination = ({ getAllApplicant, totalCount }) => {
  const totalPages = Math.ceil(totalCount / 10)
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrevClick = () => {
    getAllApplicant(currentPage - 1)
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextClick = () => {
    getAllApplicant(currentPage + 1)
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page)
    getAllApplicant(page)
  }

  const renderPaginationItems = () => {
    // const totalPages = Math.ceil(totalCount / 10); // Change this to the actual total number of pages
    const items = [];

    for (let page = 1; page <= totalPages; page++) {
      const isCurrentPage = page === currentPage;
      const className = isCurrentPage ? "current-page" : "";

      items.push(
        <li key={page}>
          <span className={className} onClick={() => handleChangePage(page)}>
            {page}
          </span>
        </li>
      );
    }

    return items;
  };

  return (
    <nav className="ls-pagination">
      <ul>
        <li className="prev">
          <button onClick={handlePrevClick} disabled={currentPage <= 1}>
            <i className="fa fa-arrow-left"></i>
          </button>
        </li>
        {renderPaginationItems()}
        <li className="next">
          <button onClick={handleNextClick} disabled={currentPage >= totalPages}>
            <i className="fa fa-arrow-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
