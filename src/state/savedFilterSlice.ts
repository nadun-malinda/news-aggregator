import { CategoryEnum, CategoryId } from "@/consts/categories";
import { SourceId } from "@/consts/sources";
import { createSlice } from "@reduxjs/toolkit";

interface SavedFilter {
  category: CategoryId;
  sources: SourceId[];
  authors: string[];
}

const initialState: SavedFilter = {
  category: CategoryEnum["all"],
  sources: [],
  authors: [],
};

const savedFilterSlice = createSlice({
  name: "savedFilter",
  initialState,
  reducers: {
    setSavedFilter(state, action) {
      state.sources = action.payload.sources;
      state.category = action.payload.category;
      state.authors = action.payload.authors;
    },
    resetHomepageFilter: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { setSavedFilter, resetHomepageFilter } = savedFilterSlice.actions;
export default savedFilterSlice.reducer;
