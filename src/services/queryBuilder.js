export const buildQuery = (q) => {
  let where = "WHERE 1=1";
  let values = [];

  // 🔍 SEARCH
  if (q.search && q.search.trim() !== "") {
    where += " AND (customer_name LIKE ? OR phone_number LIKE ?)";
    values.push(`%${q.search}%`, `%${q.search}%`);
  }

  // 🧍 GENDER
  if (q.gender && q.gender.trim() !== "") {
    const arr = q.gender.split(",");
    if (arr.length > 0) {
      where += ` AND gender IN (${arr.map(() => "?").join(",")})`;
      values.push(...arr);
    }
  }

  // 🌍 REGION
  if (q.region && q.region.trim() !== "") {
    const arr = q.region.split(",");
    if (arr.length > 0) {
      where += ` AND customer_region IN (${arr.map(() => "?").join(",")})`;
      values.push(...arr);
    }
  }

  // CATEGORY
  if (q.category && q.category.trim() !== "") {
    const arr = q.category.split(",");
    if (arr.length > 0) {
      where += ` AND product_category IN (${arr.map(() => "?").join(",")})`;
      values.push(...arr);
    }
  }

  // TAGS
  if (q.tags && q.tags.trim() !== "") {
    const arr = q.tags.split(",").filter(t => t.trim() !== "");
    if (arr.length > 0) {
      where += " AND (" + arr.map(() => "tags LIKE ?").join(" OR ") + ")";
      values.push(...arr.map(t => `%${t}%`));
    }
  }

  // PAYMENT
  if (q.payment && q.payment.trim() !== "") {
    const arr = q.payment.split(",");
    if (arr.length > 0) {
      where += ` AND payment_method IN (${arr.map(() => "?").join(",")})`;
      values.push(...arr);
    }
  }

  // AGE
  if (q.ageMin !== undefined && q.ageMin !== "") {
    where += " AND age >= ?";
    values.push(Number(q.ageMin));
  }
  if (q.ageMax !== undefined && q.ageMax !== "") {
    where += " AND age <= ?";
    values.push(Number(q.ageMax));
  }

  // DATE RANGE
  if (q.dateStart && q.dateStart.trim() !== "") {
    where += " AND date >= ?";
    values.push(q.dateStart);
  }
  if (q.dateEnd && q.dateEnd.trim() !== "") {
    where += " AND date <= ?";
    values.push(q.dateEnd);
  }

  return { where, values };
};

// SORT BUILDER
export const buildSort = (key = "date", order = "desc") => {
  const dir = order === "asc" ? "ASC" : "DESC";

  const map = {
    date: `ORDER BY date ${dir}`,
    quantity: `ORDER BY quantity ${dir}`,
    customerName: `ORDER BY customer_name ${dir}`,
  };

  return map[key] || "ORDER BY date DESC";
};
