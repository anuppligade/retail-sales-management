import React from "react";
import useSalesStore from "../store/salesStore";

export default function FilterBar() {
  const {
    search,
    filters,
    sorting,
    updateState,
    loadSales,
  } = useSalesStore();

  const apply = (key, value) => {
    updateState(key, value);
    updateState("pagination", { page: 1, limit: 10 });
    loadSales();
  };

  return (
    <div className="card p-3 mb-4">
      <div className="row g-3">

        {/* SEARCH */}
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search Customer / Phone"
            value={search}
            onChange={(e) => apply("search", e.target.value)}
          />
        </div>

        {/* REGION */}
        <div className="col-md-2">
          <select
            className="form-select"
            value={filters.regions[0] || ""}
            onChange={(e) =>
              apply("filters", {
                ...filters,
                regions: e.target.value ? [e.target.value] : [],
              })
            }
          >
            <option value="">Region</option>
            <option>North</option>
            <option>South</option>
            <option>East</option>
            <option>West</option>
          </select>
        </div>

        {/* GENDER */}
        <div className="col-md-2">
          <select
            className="form-select"
            value={filters.genders[0] || ""}
            onChange={(e) =>
              apply("filters", {
                ...filters,
                genders: e.target.value ? [e.target.value] : [],
              })
            }
          >
            <option value="">Gender</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>

        {/* CATEGORY */}
        <div className="col-md-2">
          <select
            className="form-select"
            value={filters.categories[0] || ""}
            onChange={(e) =>
              apply("filters", {
                ...filters,
                categories: e.target.value ? [e.target.value] : [],
              })
            }
          >
            <option value="">Category</option>
            <option>Electronics</option>
            <option>Clothing</option>
            <option>Beauty</option>
          </select>
        </div>

        {/* TAGS */}
        <div className="col-md-3">
          <input
            type="text"
            className="form-control"
            placeholder="Tags (comma-separated)"
            onChange={(e) =>
              apply("filters", {
                ...filters,
                tags: e.target.value
                  ? e.target.value.split(",").map((t) => t.trim())
                  : [],
              })
            }
          />
        </div>

        {/* PAYMENT METHOD */}
        <div className="col-md-2">
          <select
            className="form-select"
            value={filters.paymentMethods[0] || ""}
            onChange={(e) =>
              apply("filters", {
                ...filters,
                paymentMethods: e.target.value ? [e.target.value] : [],
              })
            }
          >
            <option value="">Payment</option>
            <option>UPI</option>
            <option>Cash</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
          </select>
        </div>

        {/* AGE RANGE */}
        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Min Age"
            min="0"
            onChange={(e) =>
              apply("filters", {
                ...filters,
                ageRange: [Number(e.target.value), filters.ageRange[1]],
              })
            }
          />
        </div>

        <div className="col-md-2">
          <input
            type="number"
            className="form-control"
            placeholder="Max Age"
            min="0"
            onChange={(e) =>
              apply("filters", {
                ...filters,
                ageRange: [filters.ageRange[0], Number(e.target.value)],
              })
            }
          />
        </div>

        {/* DATE RANGE START */}
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            onChange={(e) =>
              apply("filters", {
                ...filters,
                dateRange: [e.target.value, filters.dateRange[1]],
              })
            }
          />
        </div>

        {/* DATE RANGE END */}
        <div className="col-md-2">
          <input
            type="date"
            className="form-control"
            onChange={(e) =>
              apply("filters", {
                ...filters,
                dateRange: [filters.dateRange[0], e.target.value],
              })
            }
          />
        </div>

        {/* SORTING */}
        <div className="col-md-2">
          <select
            className="form-select"
            value={sorting.field}
            onChange={(e) =>
              apply("sorting", {
                field: e.target.value,
                order: sorting.order,
              })
            }
          >
            <option value="date">Sort by Date</option>
            <option value="quantity">Sort by Quantity</option>
            <option value="customerName">Sort by Customer A–Z</option>
          </select>
        </div>
      </div>
    </div>
  );
}
