import { newsApi } from "@/services/newsApi";
import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./searchSlice";
import filtersReducer from "./filterSlice";

const store = configureStore({
  reducer: {
    [newsApi.reducerPath]: newsApi.reducer,
    search: searchReducer,
    filters: filtersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(newsApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
