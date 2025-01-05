import { CategoryEnum, CategoryId } from "@/shared/consts/categories";
import { DEFAULT_DATE_FORMAT } from "@/shared/consts/date";
import { SOURCES, type SourceId } from "@/shared/consts/sources";
import { createSlice } from "@reduxjs/toolkit";
import { format } from "date-fns";

interface FiltersState {
  from?: string;
  to: string;
  category: CategoryId;
  sources: SourceId[];
}

const initialState: FiltersState = {
  from: undefined,
  to: format(new Date(), DEFAULT_DATE_FORMAT),
  category: CategoryEnum["all"],
  sources: SOURCES.map((source) => source.id),
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFilters(state, action) {
      state.from = action.payload.from;
      state.to = action.payload.to;
      state.category = action.payload.category;
      state.sources = action.payload.sources;
    },
    resetFilters(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setFilters, resetFilters } = filtersSlice.actions;
export default filtersSlice.reducer;
