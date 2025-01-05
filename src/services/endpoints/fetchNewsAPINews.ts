import { fetchWithNormalization } from "@/shared/utils/fetchWithNormalization";
import { filterNewsAPIBySource } from "@/shared/utils/filterNewsAPIBySource";
import { normaliseNewsAPIData } from "@/shared/utils/normaliseNewsAPIData";
import { API_CONFIG } from "@/shared/config/apiConfig";
import { FetchNewsQueryParams } from "@/types/article";
import { SourcesEnum } from "@/shared/consts/sources";
import { CategoryEnum } from "@/shared/consts/categories";

/**
 * Fetches news articles from the News API and normalizes the data.
 * Filters articles by the specified sources and categories.
 *
 * @param {FetchNewsQueryParams} param0 - Query parameters for fetching the news.
 * @param {string} param0.query - Search query (e.g., "technology").
 * @param {string} [param0.from] - Start date for the articles (e.g., "2023-01-01").
 * @param {string} [param0.to] - End date for the articles (e.g., "2023-01-31").
 * @param {Array} [param0.category] - List of categories to filter articles by (e.g., ["business"]).
 * @param {Array} param0.sources - List of sources to fetch articles from.
 * @param {function} fetchWithBQ - The `fetchBaseQuery` function provided by Redux Toolkit.
 *
 * @returns {Promise<{ data: Article[] } | { error: any }>} Normalized list of articles or an error.
 *
 * @example
 * const { data, error } = await fetchNewsAPINews({
 *   query: "technology",
 *   from: "2023-01-01",
 *   to: "2023-01-31",
 *   category: ["business"],
 *   sources: ["bbc-news"]
 * }, fetchBaseQuery);
 */
export const fetchNewsAPINews = async (
  { query, from, to, category, sources }: FetchNewsQueryParams,
  fetchWithBQ: any
) => {
  // Ensure the source includes "bbc-news" before making the API call
  if (!sources.includes(SourcesEnum["bbc-news"])) return { data: [] };

  // Construct query parameters for News API request
  const params = {
    q: query || "all", // Default to "all" if query is not provided
    apiKey: API_CONFIG.NEWS_API_KEY,
    pageSize: 100, // Increase the chances to get BBC news
    sortBy: "publishedAt",
    from: from,
    to: to,
    category: category?.includes(CategoryEnum["all"])
      ? undefined
      : category?.join(","),
  };

  // Fetch and normalize the data
  return fetchWithNormalization(
    fetchWithBQ,
    API_CONFIG.NEWS_API_URL,
    params,
    (data) =>
      filterNewsAPIBySource(normaliseNewsAPIData(data.articles), sources)
  );
};
