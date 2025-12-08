import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./utils/db.js";
import salesRoutes from "./routes/salesRoutes.js";

dotenv.config();

await connectDB();  // ⭐ initialize pool before any route or service runs

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/sales", salesRoutes);

app.listen(5000, () => console.log("Backend running on port 5000"));
