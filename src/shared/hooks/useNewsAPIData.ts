import { useFilters } from "@/shared/hooks/useFilters";
import { useFetchNewsAPIQuery } from "@/services/aggregatedNewsApi";

/**
 * Custom hook to fetch and manage NewsAPI data based on applied filters.
 *
 * This hook retrieves data from the NewsAPI using the `useFetchNewsAPIQuery` hook.
 * The filters used in the API request are derived from the `useFilters` hook, which provides:
 * - `from`: The start date for fetching articles.
 * - `to`: The end date for fetching articles.
 * - `query`: The search query for filtering articles.
 * - `sources`: The specific news sources to include.
 * - `category`: The category of news to filter by.
 *
 * @returns {Object} An object containing:
 *   - `newsAPIData` (any): The fetched news data from the NewsAPI.
 *   - `isFetchingNewsApiNews` (boolean): A boolean indicating if the data is currently being fetched.
 *
 * @example
 * // Example usage in a React component:
 * const { newsAPIData, isFetchingNewsApiNews } = useNewsAPIData();
 *
 * if (isFetchingNewsApiNews) {
 *   return <p>Loading...</p>;
 * }
 *
 * return (
 *   <div>
 *     {newsAPIData?.articles.map((article) => (
 *       <p key={article.id}>{article.title}</p>
 *     ))}
 *   </div>
 * );
 *
 * @see {@link useFilters} for managing applied filters.
 * @see {@link useFetchNewsAPIQuery} for querying the NewsAPI.
 */
export function useNewsAPIData() {
  const { from, to, query, sources, category } = useFilters();

  const { data: newsAPIData, isFetching: isFetchingNewsApiNews } =
    useFetchNewsAPIQuery({
      to,
      from,
      query,
      sources,
      category,
    });

  return { newsAPIData, isFetchingNewsApiNews };
}
