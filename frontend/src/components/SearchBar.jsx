import React from "react";
import useSalesStore from "../store/salesStore";
export default function SearchBar() {
  const updateState = useSalesStore(s => s.updateState);
  const loadSales = useSalesStore(s => s.loadSales);
  return (
    <input className="search-input" placeholder="Search..."
      onChange={(e)=>{ updateState("search", e.target.value); loadSales(); }} />
  );
}