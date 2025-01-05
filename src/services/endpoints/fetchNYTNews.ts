import { fetchWithNormalization } from "@/shared/utils/fetchWithNormalization";
import { API_CONFIG } from "@/shared/config/apiConfig";
import { FetchNewsQueryParams } from "@/types/article";
import { normaliseNYTNewsData } from "@/shared/utils/normaliseNYTNewsData";
import { CategoryEnum } from "@/types/category";
import { SourcesEnum } from "@/types/source";

/**
 * Fetches articles from The New York Times API and normalizes the data.
 *
 * @param {FetchNewsQueryParams} param0 - Query parameters for fetching the news.
 * @param {string} param0.query - Search query (e.g., "technology").
 * @param {string} [param0.from] - Start date for the articles (e.g., "2023-01-01").
 * @param {string} [param0.to] - End date for the articles (e.g., "2023-01-31").
 * @param {Array} [param0.category] - List of categories to filter articles by (e.g., ["science"]).
 * @param {Array} param0.sources - List of sources to fetch articles from.
 * @param {function} fetchWithBQ - The `fetchBaseQuery` function provided by Redux Toolkit.
 *
 * @returns {Promise<{ data: Article[] } | { error: any }>} Normalized list of articles or an error.
 *
 * @example
 * const { data, error } = await fetchNYTNews({
 *   query: "science",
 *   from: "2023-01-01",
 *   to: "2023-01-31",
 *   category: ["science"],
 *   sources: ["nyt"]
 * }, fetchBaseQuery);
 */
export const fetchNYTNews = async (
  { query, from, to, category, sources }: FetchNewsQueryParams,
  fetchWithBQ: any
) => {
  // Ensure the source includes "nyt" before making the API call
  if (!sources.includes(SourcesEnum["nyt"])) return { data: [] };

  // Construct query parameters for the New York Times API request
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

  // Fetch data and normalize it
  return fetchWithNormalization(
    fetchWithBQ,
    API_CONFIG.NYT_API_URL,
    params,
    (data) => normaliseNYTNewsData(data.response.docs)
  );
};
