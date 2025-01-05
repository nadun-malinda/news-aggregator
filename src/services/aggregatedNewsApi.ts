import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { SourcesEnum } from "@/shared/consts/sources";
import { CategoryEnum } from "@/shared/consts/categories";
import { filterNewsAPIBySource } from "@/shared/utils/filterNewsAPIBySource";
import { normaliseGuardianNewsData } from "@/shared/utils/normaliseGuardianNewsData";
import { normaliseNewsAPIData } from "@/shared/utils/normaliseNewsAPIData";
import { normaliseNYTNewsData } from "@/shared/utils/normaliseNYTNewsData";
import { Article, FetchNewsQueryParams } from "@/types/article";

const API_CONFIG = {
  NEWS_API_URL: process.env.REACT_APP_NEWSAPI_URL || "",
  NEWS_API_KEY: process.env.REACT_APP_NEWSAPI_KEY || "",
  GUARDIAN_API_URL: process.env.REACT_APP_GUARDIAN_API_URL || "",
  GUARDIAN_API_KEY: process.env.REACT_APP_GUARDIAN_API_KEY || "",
  NYT_API_URL: process.env.REACT_APP_NYT_API_URL || "",
  NYT_API_KEY: process.env.REACT_APP_NYT_API_KEY || "",
};

/**
 * Handles API errors and logs them.
 * @param error - The error object returned by the API call.
 * @returns An object containing the error.
 */
const handleError = (error: any) => {
  console.error("API Error:", error);
  return { error };
};

/**
 * Fetches and normalizes data from the specified API.
 * @param fetchFn - The fetch function provided by `fetchBaseQuery`.
 * @param url - The API endpoint URL.
 * @param params - Query parameters for the API call.
 * @param normalizeFn - Function to normalize the API response data.
 * @returns A normalized list of articles or an error object.
 */
const fetchWithNormalization = async (
  fetchFn: any,
  url: string,
  params: Record<string, any>,
  normalizeFn: (data: any) => Article[]
) => {
  const result: any = await fetchFn({ url, params });
  if (result.error) return handleError(result.error);
  return { data: normalizeFn(result.data) };
};

export const aggregatedNewsApi = createApi({
  reducerPath: "aggregatedNewsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    /**
     * Fetches articles from NewsAPI.
     * @example
     * const { data, error } = useFetchNewsAPIQuery({
     *   query: "technology",
     *   from: "2023-01-01",
     *   to: "2023-01-31",
     *   category: "technology",
     *   sources: ["bbc-news"],
     * });
     */
    fetchNewsAPI: builder.query<Article[], FetchNewsQueryParams>({
      queryFn: async (
        { query, from, to, category, sources },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) => {
        if (!sources.includes(SourcesEnum["bbc-news"])) return { data: [] };

        const params = {
          q: query || "all",
          apiKey: API_CONFIG.NEWS_API_KEY,
          pageSize: 100, // Increase the chances to get BBC news :(
          sortBy: "publishedAt",
          from: from,
          to: to,
          category: category?.includes(CategoryEnum["all"])
            ? undefined
            : category?.join(","),
        };

        return fetchWithNormalization(
          fetchWithBQ,
          API_CONFIG.NEWS_API_URL,
          params,
          (data) =>
            filterNewsAPIBySource(normaliseNewsAPIData(data.articles), sources)
        );
      },
    }),

    /**
     * Fetches articles from The Guardian API.
     * @example
     * const { data, error } = useFetchGuardianNewsQuery({
     *   query: "politics",
     *   from: "2023-01-01",
     *   to: "2023-01-31",
     *   category: "politics",
     *   sources: ["guardian"],
     * });
     */
    fetchGuardianNews: builder.query<Article[], FetchNewsQueryParams>({
      queryFn: async (
        { query, from, to, category, sources },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) => {
        if (!sources.includes(SourcesEnum["guardian"])) return { data: [] };

        const params: Record<string, any> = {
          "api-key": API_CONFIG.GUARDIAN_API_KEY,
          "show-fields":
            "id,webTitle,bodyText,thumbnail,byline,sectionName,webPublicationDate,webUrl",
          "page-size": 10,
          "order-by": "newest",
          q: query && `"${query}"`,
          "from-date": from,
          "to-date": to,
        };

        if (!category?.includes(CategoryEnum["all"])) {
          params.section = category?.join(",");
        }

        return fetchWithNormalization(
          fetchWithBQ,
          API_CONFIG.GUARDIAN_API_URL,
          params,
          (data) => normaliseGuardianNewsData(data.response.results)
        );
      },
    }),

    /**
     * Fetches articles from The New York Times API.
     * @example
     * const { data, error } = useFetchNYTNewsQuery({
     *   query: "science",
     *   from: "2023-01-01",
     *   to: "2023-01-31",
     *   category: "science",
     *   sources: ["nyt"],
     * });
     */
    fetchNYTNews: builder.query<Article[], FetchNewsQueryParams>({
      queryFn: async (
        { query, from, to, category, sources },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) => {
        if (!sources.includes(SourcesEnum["nyt"])) return { data: [] };

        const params = {
          query,
          "api-key": API_CONFIG.NYT_API_KEY,
          fq: category?.includes(CategoryEnum["all"])
            ? undefined
            : `news_desk:("${category?.join(",")}")`,
          sort: "newest",
          page: 0,
          begin_date: from,
          end_date: to,
        };

        return fetchWithNormalization(
          fetchWithBQ,
          API_CONFIG.NYT_API_URL,
          params,
          (data) => normaliseNYTNewsData(data.response.docs)
        );
      },
    }),
  }),
});

export const {
  useFetchNewsAPIQuery,
  useFetchGuardianNewsQuery,
  useFetchNYTNewsQuery,
} = aggregatedNewsApi;
