import Sales from "../models/Sales.js";
import { buildQuery, buildSort } from "../services/salesService.js";

export const getSales = async (req, res) => {
  try {
    const filter = buildQuery(req.query);
    const sort = buildSort(req.query.sort, req.query.order);

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const [rawData, total] = await Promise.all([
      Sales.find(filter).sort(sort).skip(skip).limit(limit),
      Sales.countDocuments(filter)
    ]);

    // 🔥 MAP DATA — convert Excel-style fields to frontend fields
    const data = rawData.map(item => ({
      _id: item._id,

      customerId: item["Customer ID"],
      customerName: item["Customer Name"],
      phoneNumber: item["Phone Number"],
      gender: item["Gender"],
      age: item["Age"],
      customerRegion: item["Customer Region"],
      customerType: item["Customer Type"],
      transactionId: item["Transaction ID"],

      productId: item["Product ID"],
      productName: item["Product Name"],
      brand: item["Brand"],
      productCategory: item["Product Category"],

      tags: typeof item["Tags"] === "string"
        ? item["Tags"].split(",").map(t => t.trim())
        : [],

      quantity: item["Quantity"],
      pricePerUnit: item["Price per Unit"],
      discountPercentage: item["Discount Percentage"],
      totalAmount: item["Total Amount"],
      finalAmount: item["Final Amount"],

      // ✅ FIXED DATE
      date: item["Date"] ? new Date(item["Date"]) : null,

      paymentMethod: item["Payment Method"],
      orderStatus: item["Order Status"],
      deliveryType: item["Delivery Type"],
      storeId: item["Store ID"],
      storeLocation: item["Store Location"],
      salespersonId: item["Salesperson ID"],
      employeeName: item["Employee Name"]
    }));

    res.json({
      page,
      totalPages: Math.ceil(total / limit),
      totalResults: total,
      data
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
