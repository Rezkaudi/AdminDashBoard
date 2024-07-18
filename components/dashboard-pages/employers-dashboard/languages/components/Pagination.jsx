"use client"
import { useSelector, useDispatch } from "react-redux";
import { setCurrentPage } from "@/mainData/languages/languagesSlice";
import { getAllLanguages } from "@/mainData/languages/handleRequests";

import useToken from "@/utils/useToken";

const Pagination = () => {

  const dispatch = useDispatch()
  const { totalCount, currentPage } = useSelector(state => state.languages)
  const totalPages = Math.ceil(totalCount / 10)
  const { token } = useToken()

  const handleChangePage = (currentPage) => {
    dispatch(setCurrentPage(currentPage))
    dispatch(getAllLanguages({ currentPage, token }))
  }

  const renderPaginationItems = () => {
    const items = [];

    for (let page = 1; page <= totalPages; page++) {
      const isCurrentPage = page === currentPage;
      const className = isCurrentPage ? "current-page" : "";

      items.push(
        <li key={page}>
          <span className={className} onClick={() => handleChangePage(page)
          }>
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
          <button onClick={() => handleChangePage(currentPage - 1)} disabled={currentPage <= 1}>
            <i className="fa fa-arrow-left"></i>
          </button>
        </li>
        {renderPaginationItems()}
        <li className="next">
          <button onClick={() => handleChangePage(currentPage + 1)} disabled={currentPage >= totalPages}>
            <i className="fa fa-arrow-right"></i>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
