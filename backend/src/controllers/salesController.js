import { getAllSales } from "../services/salesService.js";

export const getSales = async (req, res) => {
  try {
    const result = await getAllSales(req.query);

    // Safety check
    if (!result || !result.data) {
      return res.json({
        page: result?.page || 1,
        totalResults: 0,
        totalPages: 0,
        data: []
      });
    }

    // Format and convert MySQL string numbers -> JavaScript numbers
    const formatted = result.data.map((item) => ({
      id: item.id ?? null,

      transactionId: item.transaction_id ?? null,
      date: item.date ?? null,

      customerId: item.customer_id ?? null,
      customerName: item.customer_name ?? null,
      phoneNumber: item.phone_number ?? null,
      gender: item.gender ?? null,
      age: Number(item.age) || 0,
      customerRegion: item.customer_region ?? null,
      customerType: item.customer_type ?? null,

      productId: item.product_id ?? null,
      productName: item.product_name ?? null,
      brand: item.brand ?? null,
      productCategory: item.product_category ?? null,

      tags: item.tags ? item.tags.split(",").map(t => t.trim()) : [],

      // ⭐ Convert numeric strings to actual numbers
      quantity: Number(item.quantity) || 0,
      pricePerUnit: Number(item.price_per_unit) || 0,
      discountPercentage: Number(item.discount_percentage) || 0,
      totalAmount: Number(item.total_amount) || 0,
      finalAmount: Number(item.final_amount) || 0,

      paymentMethod: item.payment_method ?? null,
      orderStatus: item.order_status ?? null,
      deliveryType: item.delivery_type ?? null,
      storeId: item.store_id ?? null,
      storeLocation: item.store_location ?? null,
      salespersonId: item.salesperson_id ?? null,
      employeeName: item.employee_name ?? null
    }));

    res.json({
      page: result.page,
      totalResults: result.total,
      totalPages: Math.ceil(result.total / result.limit),
      data: formatted
    });

  } catch (err) {
    console.error("Error in controller:", err);
    res.status(500).json({ message: "Server error" });
  }
};
