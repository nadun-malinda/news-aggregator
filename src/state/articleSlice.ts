import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Article {
  id: string; // Generate a unique ID from title + source or other properties.
  source: string;
  title: string;
  content: string | null;
  [key: string]: any; // Other article properties
}

interface ArticleState {
  articles: Article[];
  errors: Record<string, string>; // To track errors by source
}

const initialState: ArticleState = {
  articles: [],
  errors: {},
};

const articleSlice = createSlice({
  name: "article",
  initialState,
  reducers: {
    addArticles: (state, action: PayloadAction<Article[]>) => {
      const existingIds = new Set(state.articles.map((article) => article.id));
      const newArticles = action.payload.filter(
        (article) => !existingIds.has(article.id)
      );
      state.articles.push(...newArticles);
    },
    setError: (
      state,
      action: PayloadAction<{ source: string; error: string }>
    ) => {
      state.errors[action.payload.source] = action.payload.error;
    },
    processApiResponse: (
      state,
      action: PayloadAction<{
        source: string;
        data?: Article[];
        error?: string;
      }>
    ) => {
      const { source, data, error } = action.payload;

      if (data) {
        const existingIds = new Set(
          state.articles.map((article) => article.id)
        );
        const newArticles = data.filter(
          (article) => !existingIds.has(article.id)
        );
        state.articles.push(...newArticles);
      }

      if (error) {
        state.errors[source] = error;
      }
    },
  },
});

export const { addArticles, setError, processApiResponse } =
  articleSlice.actions;
export default articleSlice.reducer;
