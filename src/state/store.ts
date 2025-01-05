import { aggregatedNewsApi } from "@/services/aggregatedNewsApi";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import filtersReducer from "./filterSlice";
import savedFilterReducer from "./savedFilterSlice";

const store = configureStore({
  reducer: {
    [aggregatedNewsApi.reducerPath]: aggregatedNewsApi.reducer,
    search: searchReducer,
    filters: filtersReducer,
    savedFilters: savedFilterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(aggregatedNewsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
