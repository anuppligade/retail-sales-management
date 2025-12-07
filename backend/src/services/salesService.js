export const buildQuery = (q) => {
  let filter = {};

  // 🔍 SEARCH (Customer Name OR Phone Number)
  if (q.search) {
  filter.$or = [
    { "Customer Name": { $regex: q.search, $options: "i" } },

    // PHONE NUMBER FIX (for numeric fields)
    {
      $expr: {
        $regexMatch: {
          input: { $toString: "$Phone Number" },
          regex: q.search,
          options: "i"
        }
      }
    }
  ];
}


  // 🧍 Gender filter
  if (q.gender) {
    filter["Gender"] = { $in: q.gender.split(",") };
  }

  // 🌍 Region filter
  if (q.region) {
    filter["Customer Region"] = { $in: q.region.split(",") };
  }

  // 🏷 Category filter
  if (q.category) {
    filter["Product Category"] = { $in: q.category.split(",") };
  }

  // 🏷 Tags (string contains)
  if (q.tags) {
    const tagList = q.tags.split(",");
    filter["Tags"] = { $regex: tagList.join("|"), $options: "i" };
  }

  // 💳 Payment Method
  if (q.payment) {
    filter["Payment Method"] = { $in: q.payment.split(",") };
  }

  // 🔢 Age range
  if (q.ageMin || q.ageMax) {
    filter["Age"] = {};
    if (q.ageMin) filter["Age"].$gte = Number(q.ageMin);
    if (q.ageMax) filter["Age"].$lte = Number(q.ageMax);
  }

  // 📅 Date range
  if (q.dateStart || q.dateEnd) {
    filter["Date"] = {};
    if (q.dateStart) filter["Date"].$gte = new Date(q.dateStart);
    if (q.dateEnd) filter["Date"].$lte = new Date(q.dateEnd);
  }

  return filter;
};

// 🔽 Sorting Logic Updated
export const buildSort = (key, order = "desc") => {
  const dir = order === "asc" ? 1 : -1;

  const sortMap = {
    date: { "Date": dir * -1 },
    quantity: { "Quantity": dir },
    customerName: { "Customer Name": dir }
  };

  return sortMap[key] || { "Date": -1 };
};