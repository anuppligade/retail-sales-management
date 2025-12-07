import React from "react";
import useSalesStore from "../store/salesStore";

export default function StatsBar() {
  const allSales = useSalesStore((s) => s.allSales);

  const totalUnits = allSales?.reduce((sum, item) => sum + (item.quantity || 0), 0) || 0;
  const totalAmount = allSales?.reduce((sum, item) => sum + (item.finalAmount || 0), 0) || 0;
  const totalDiscount = allSales?.reduce(
    (sum, item) => sum + ((item.totalAmount || 0) - (item.finalAmount || 0)),
    0
  ) || 0;

  return (
    <div className="row g-4 mb-4">

      <div className="col-md-4">
        <div className="card shadow-sm p-3 text-center dashboard-card">
          <h6 className="text-muted">Total Units Sold</h6>
          <h3 className="fw-bold">{totalUnits}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm p-3 text-center dashboard-card">
          <h6 className="text-muted">Total Sales Amount</h6>
          <h3 className="fw-bold">₹{totalAmount.toLocaleString()}</h3>
        </div>
      </div>

      <div className="col-md-4">
        <div className="card shadow-sm p-3 text-center dashboard-card">
          <h6 className="text-muted">Total Discount Given</h6>
          <h3 className="fw-bold">₹{totalDiscount.toLocaleString()}</h3>
        </div>
      </div>

    </div>
  );
}
