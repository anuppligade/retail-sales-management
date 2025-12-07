import { create } from "zustand";
import { fetchSales } from "../services/salesAPI";

const useSalesStore = create((set, get) => ({

  // SEARCH FILTERS
  search: "",
  filters: {
    genders: [],
    regions: [],
    categories: [],
    tags: [],
    paymentMethods: [],
    ageRange: [0, 100],
    dateRange: ["", ""]
  },

  // SORTING & PAGINATION
  sorting: { field: "date", order: "desc" },
  pagination: { page: 1, limit: 10 },

  // PAGINATED DATA
  salesData: [],
  totalPages: 1,

  // FULL DATA (for Dashboard totals)
  allSales: [],   // ✅ important

  updateState: (key, value) => set({ [key]: value }),

  // Load only current page
  loadSales: async () => {
    const { search, filters, sorting, pagination } = get();

    const params = {
      search,
      gender: filters.genders.join(","),
      region: filters.regions.join(","),
      category: filters.categories.join(","),
      tags: filters.tags.join(","),
      payment: filters.paymentMethods.join(","),
      ageMin: filters.ageRange[0],
      ageMax: filters.ageRange[1],
      dateStart: filters.dateRange[0],
      dateEnd: filters.dateRange[1],
      sort: sorting.field,
      order: sorting.order,
      page: pagination.page,
      limit: pagination.limit
    };

    const res = await fetchSales(params);
    set({ salesData: res.data, totalPages: res.totalPages });
  },

  // Load ALL DATA for Dashboard totals
  loadAllSales: async () => {
    const res = await fetchSales({ page: 1, limit: 100000 }); // large limit
    set({ allSales: res.data });
  }

}));

export default useSalesStore;
