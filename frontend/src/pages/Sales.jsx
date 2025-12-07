import React, { useEffect } from "react";
import useSalesStore from "../store/salesStore";

import FilterBar from "../components/FilterBar";
import SalesTable from "../components/SalesTable";
import Pagination from "../components/Pagination";

export default function Sales() {
  const { loadSales } = useSalesStore();

  useEffect(() => {
    loadSales(); // Load data when page opens
  }, []);

  return (
    <div>

      <h2 className="fw-bold mb-3">Sales Management System</h2>

      {/* Filters */}
      <FilterBar />

      

      {/* Table */}
      <div className="card mt-4">
        <div className="card-body">
          <SalesTable />
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-3 d-flex justify-content-center">
        <Pagination />
      </div>

    </div>
  );
}
