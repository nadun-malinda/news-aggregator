import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Article, FetchNewsQueryParams } from "@/types/article";
import { fetchNYTNews } from "@/services/endpoints/fetchNYTNews";
import { fetchNewsAPINews } from "@/services/endpoints/fetchNewsAPINews";
import { fetchGuardianNews } from "@/services/endpoints/fetchGuardianNews";

/**
 * API service to fetch and aggregate news from multiple sources.
 *
 * The service provides endpoints to fetch articles from different news APIs
 * like News API, The Guardian, and The New York Times.
 */
export const aggregatedNewsApi = createApi({
  reducerPath: "aggregatedNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    /**
     * Fetches news articles from News API.
     *
     * @param params The query parameters to filter the news articles.
     * @returns A list of articles.
     */
    fetchNewsAPI: builder.query<Article[], FetchNewsQueryParams>({
      queryFn: (params, _queryApi, _extraOptions, fetchWithBQ) =>
        fetchNewsAPINews(params, fetchWithBQ),
    }),

    /**
     * Fetches news articles from The Guardian API.
     *
     * @param params The query parameters to filter the news articles.
     * @returns A list of articles.
     */
    fetchGuardianNews: builder.query<Article[], FetchNewsQueryParams>({
      queryFn: (params, _queryApi, _extraOptions, fetchWithBQ) =>
        fetchGuardianNews(params, fetchWithBQ),
    }),

    /**
     * Fetches news articles from The New York Times API.
     *
     * @param params The query parameters to filter the news articles.
     * @returns A list of articles.
     */
    fetchNYTNews: builder.query<Article[], FetchNewsQueryParams>({
      queryFn: (params, _queryApi, _extraOptions, fetchWithBQ) =>
        fetchNYTNews(params, fetchWithBQ),
    }),
  }),
});

export const {
  useFetchNewsAPIQuery,
  useFetchNYTNewsQuery,
  useFetchGuardianNewsQuery,
} = aggregatedNewsApi;
