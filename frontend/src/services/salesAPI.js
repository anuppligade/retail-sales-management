import axios from "axios";
export const fetchSales = async (params) => {
  const res = await axios.get("http://localhost:5000/api/sales", { params });
  return res.data;
};