import { getDB } from "../utils/db.js";
import { buildQuery, buildSort } from "./queryBuilder.js";

export const getAllSales = async (q) => {
  const pool = getDB(); // ⭐ MUST be inside function

  if (!pool) {
    throw new Error("MySQL pool not initialized. Call connectDB() first.");
  }

  const { where, values } = buildQuery(q);
  const sort = buildSort(q.sort, q.order);

  const page = Number(q.page) || 1;
  const limit = Number(q.limit) || 20;
  const offset = (page - 1) * limit;

  const sql = `
    SELECT * 
    FROM sales
    ${where}
    ${sort}
    LIMIT ? OFFSET ?
  `;

  console.log("SQL:", sql);
  console.log("VALUES:", [...values, limit, offset]);

  const [rows] = await pool.query(sql, [...values, limit, offset]);

  // Total count
  const countSql = `SELECT COUNT(*) AS total FROM sales ${where}`;
  const [countRows] = await pool.query(countSql, values);

  return {
    data: rows,
    total: countRows[0].total,
    page,
    limit,
  };
};
