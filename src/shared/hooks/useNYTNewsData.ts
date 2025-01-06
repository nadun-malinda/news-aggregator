import { useFilters } from "@/shared/hooks/useFilters";
import { useFetchNYTNewsQuery } from "@/services/aggregatedNewsApi";

/**
 * Custom hook to fetch and manage New York Times (NYT) news data based on applied filters.
 *
 * This hook retrieves data from the New York Times API using the `useFetchNYTNewsQuery` hook.
 * The filters used in the API request are derived from the `useFilters` hook, which provides:
 * - `from`: The start date for fetching articles.
 * - `to`: The end date for fetching articles.
 * - `query`: The search query for filtering articles.
 * - `sources`: The specific news sources to include.
 * - `category`: The category of news to filter by.
 *
 * @returns {Object} An object containing:
 *   - `nytNewsData` (any): The fetched news data from the New York Times API.
 *   - `isFetchingNYTNews` (boolean): A boolean indicating if the data is currently being fetched.
 *
 * @example
 * // Example usage in a React component:
 * const { nytNewsData, isFetchingNYTNews } = useNYTNewsData();
 *
 * if (isFetchingNYTNews) {
 *   return <p>Loading...</p>;
 * }
 *
 * return (
 *   <div>
 *     {nytNewsData?.articles.map((article) => (
 *       <p key={article.id}>{article.title}</p>
 *     ))}
 *   </div>
 * );
 *
 * @see {@link useFilters} for managing applied filters.
 * @see {@link useFetchNYTNewsQuery} for querying the New York Times API.
 */
export function useNYTNewsData() {
  const { from, to, query, sources, category } = useFilters();

  const { data: nytNewsData, isFetching: isFetchingNYTNews } =
    useFetchNYTNewsQuery({
      to,
      from,
      query,
      sources,
      category,
    });

  return { nytNewsData, isFetchingNYTNews };
}
