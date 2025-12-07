import React from "react";
import useSalesStore from "../store/salesStore";
export default function SortingDropdown() {
  const { sorting, updateState, loadSales } = useSalesStore();
  return (
    <select value={sorting.field}
      onChange={(e)=>{ updateState("sorting", { field:e.target.value, order:"asc" }); loadSales(); }}>
      <option value="date">Date</option>
      <option value="customerName">Customer Name</option>
      <option value="quantity">Quantity</option>
    </select>
  );
}