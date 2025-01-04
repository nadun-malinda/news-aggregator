import { CategoryEnum, CategoryId } from "@/shared/consts/categories";
import { SourceId, SourcesEnum } from "@/shared/consts/sources";
import { createSlice } from "@reduxjs/toolkit";

interface SavedFilter {
  category: CategoryId;
  sources: SourceId[];
  authors: string[];
}

const savedFilters = localStorage.getItem("savedFilters");

const initialState: SavedFilter = savedFilters
  ? JSON.parse(savedFilters)
  : {
      category: CategoryEnum["all"],
      sources: [
        SourcesEnum["nyt"],
        SourcesEnum["bbc-news"],
        SourcesEnum["guardian"],
      ],
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

      // Save the new state to localStorage
      localStorage.setItem("savedFilters", JSON.stringify(state));
    },
    resetHomepageFilter: (state) => {
      Object.assign(state, initialState);

      // Clear from localStorage
      localStorage.removeItem("savedFilters");
    },
  },
});

export const { setSavedFilter, resetHomepageFilter } = savedFilterSlice.actions;
export default savedFilterSlice.reducer;
