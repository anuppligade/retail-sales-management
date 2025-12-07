import React from "react";
import useSalesStore from "../store/salesStore";

export default function Pagination() {
  const { pagination, totalPages, updateState, loadSales } = useSalesStore();

  const go = (pg) => {
    updateState("pagination", { ...pagination, page: pg });
    loadSales();
  };

  return (
    <nav>
      <ul className="pagination">

        <li className={`page-item ${pagination.page === 1 ? "disabled" : ""}`}>
          <button className="page-link" onClick={() => go(pagination.page - 1)}>
            Prev
          </button>
        </li>

        <li className="page-item disabled">
          <span className="page-link">
            {pagination.page} / {totalPages}
          </span>
        </li>

        <li
          className={`page-item ${
            pagination.page === totalPages ? "disabled" : ""
          }`}
        >
          <button className="page-link" onClick={() => go(pagination.page + 1)}>
            Next
          </button>
        </li>

      </ul>
    </nav>
  );
}
