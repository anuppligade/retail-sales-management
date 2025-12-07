import React from "react";
import useSalesStore from "../store/salesStore";

export default function SalesTable() {
  const rows = useSalesStore((s) => s.salesData);

  if (!rows.length) return <p>No results found.</p>;

  return (
    <table className="table table-striped table-bordered">
      <thead className="table-light">
        <tr>
          <th>Transaction ID</th>
          <th>Date</th>
          <th>Customer ID</th>
          <th>Customer Name</th>
          <th>Phone Number</th>
          <th>Gender</th>
          <th>Age</th>
          <th>Product Category</th>
          <th>Quantity</th>
          <th>Final Amount</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((s) => (
          <tr key={s._id}>
            <td>{s.transactionId}</td>
            <td>{new Date(s.date).toISOString().split("T")[0]}</td>
            <td>{s.customerId}</td>
            <td>{s.customerName}</td>
            <td>{s.phoneNumber}</td>
            <td>{s.gender}</td>
            <td>{s.age}</td>
            <td>{s.productCategory}</td>
            <td>{s.quantity}</td>
            <td>₹{s.finalAmount}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
