import mongoose from "mongoose";

// Use strict:false to allow Excel-style field names
const SalesSchema = new mongoose.Schema({}, { strict: false });

export default mongoose.model("Sales", SalesSchema);
