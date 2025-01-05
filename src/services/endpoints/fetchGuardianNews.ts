import { fetchWithNormalization } from "@/shared/utils/fetchWithNormalization";
import { API_CONFIG } from "@/shared/config/apiConfig";
import { FetchNewsQueryParams } from "@/types/article";
import { SourcesEnum } from "@/shared/consts/sources";
import { CategoryEnum } from "@/shared/consts/categories";
import { normaliseGuardianNewsData } from "@/shared/utils/normaliseGuardianNewsData";

/**
 * Fetches articles from The Guardian API and normalizes the data.
 *
 * @param {FetchNewsQueryParams} param0 - Query parameters for fetching the news.
 * @param {string} param0.query - Search query (e.g., "politics").
 * @param {string} [param0.from] - Start date for the articles (e.g., "2023-01-01").
 * @param {string} [param0.to] - End date for the articles (e.g., "2023-01-31").
 * @param {Array} [param0.category] - List of categories to filter articles by (e.g., ["politics"]).
 * @param {Array} param0.sources - List of sources to fetch articles from.
 * @param {function} fetchWithBQ - The `fetchBaseQuery` function provided by Redux Toolkit.
 *
 * @returns {Promise<{ data: Article[] } | { error: any }>} Normalized list of articles or an error.
 *
 * @example
 * const { data, error } = await fetchGuardianNews({
 *   query: "politics",
 *   from: "2023-01-01",
 *   to: "2023-01-31",
 *   category: ["politics"],
 *   sources: ["guardian"]
 * }, fetchBaseQuery);
 */
export const fetchGuardianNews = async (
  { query, from, to, category, sources }: FetchNewsQueryParams,
  fetchWithBQ: any
) => {
  // Ensure the source includes "guardian" before making the API call
  if (!sources.includes(SourcesEnum["guardian"])) return { data: [] };

  // Construct query parameters for The Guardian API request
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

  // If the category is not "all", filter articles by section
  if (!category?.includes(CategoryEnum["all"])) {
    params.section = category?.join(",");
  }

  // Fetch data and normalize it
  return fetchWithNormalization(
    fetchWithBQ,
    API_CONFIG.GUARDIAN_API_URL,
    params,
    (data) => normaliseGuardianNewsData(data.response.results)
  );
};
