import React, { useEffect } from "react";
import "../styles/dashboard.css";
import useSalesStore from "../store/salesStore";
import StatsBar from "../components/StatsBar";

export default function Dashboard() {
  const { loadAllSales } = useSalesStore();

  // Load full dataset once
  useEffect(() => {
    loadAllSales();
  }, []);

  return (
    <div className="dashboard">

      <h2 className="fw-bold mb-4">Sales Management System </h2>

      {/* TOTALS SECTION */}
      <StatsBar />

       <div className="row g-4">

  {/* Quick Access */}
  <div className="col-md-4">
    <div className="card p-3 shadow-sm dashboard-card">
      <h6 className="fw-bold">Upcoming Development</h6>
      <ul className="mt-2">
        <li>📊 View All Sales Records</li>
        <li>➕ Add New Product Entry</li>
        <li>👥 Manage Customer Profiles</li>
        <li>📦 Track Pending Orders</li>
        <li>🧾 Generate Sales Report</li>
      </ul>
    </div>
  </div>

  {/* Recent Activity */}
  <div className="col-md-8">
    <div className="card p-3 shadow-sm dashboard-card">
      <h6 className="fw-bold">Recent Activity</h6>

      <p className="text-muted">• 12 new sales transactions recorded in the last hour</p>
      <p className="text-muted">• 3 products updated by the inventory team</p>
      <p className="text-muted">• 5 new customers registered today</p>
      <p className="text-muted">• Sales report for November automatically generated</p>
      <p className="text-muted">• 8 orders marked as “Delivered” this morning</p>

    </div>
  </div>

</div>

    </div>
  );
}
