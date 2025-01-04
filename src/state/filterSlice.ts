import { CategoryEnum, CategoryId } from "@/shared/consts/categories";
import { SOURCES, type SourceId } from "@/shared/consts/sources";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { format } from "date-fns";

interface FiltersState {
  from: string;
  to: string;
  category: CategoryId;
  sources: SourceId[];
}

const initialState: FiltersState = {
  from: format(new Date(), "yyyy-MM-dd"),
  to: format(new Date(), "yyyy-MM-dd"),
  category: CategoryEnum["all"],
  sources: SOURCES.map((source) => source.id),
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setFrom(state, action: PayloadAction<string>) {
      state.from = action.payload;
    },
    setTo(state, action: PayloadAction<string>) {
      state.to = action.payload;
    },
    setCategory(state, action: PayloadAction<CategoryId>) {
      state.category = action.payload;
    },
    setSource(state, action: PayloadAction<SourceId[]>) {
      state.sources = action.payload;
    },
    resetFilters(state) {
      Object.assign(state, initialState);
    },
  },
});

export const { setFrom, setTo, setCategory, setSource, resetFilters } =
  filtersSlice.actions;

export const selectFilters = (state: { filters: FiltersState }) =>
  state.filters;
export const selectFrom = (state: { filters: FiltersState }) =>
  state.filters.from;
export const selectTo = (state: { filters: FiltersState }) => state.filters.to;
export const selectCategory = (state: { filters: FiltersState }) =>
  state.filters.category;
export const selectSource = (state: { filters: FiltersState }) =>
  state.filters.sources;

export default filtersSlice.reducer;
