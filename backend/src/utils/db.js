import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

let pool = null;

export const connectDB = async () => {
  try {
    pool = mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
    });

    const conn = await pool.getConnection();
    console.log("MySQL Connected Successfully");
    conn.release();
  } catch (err) {
    console.error("MySQL Connection Error:", err);
    process.exit(1);
  }
};

// ⭐⭐ THIS RETURNS THE POOL AFTER connection ⭐⭐
export const getDB = () => pool;
