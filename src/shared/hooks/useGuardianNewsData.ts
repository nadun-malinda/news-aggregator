import { useFilters } from "@/shared/hooks/useFilters";
import { useFetchGuardianNewsQuery } from "@/services/aggregatedNewsApi";

/**
 * Custom hook to fetch and manage Guardian news data based on applied filters.
 *
 * This hook retrieves data from the Guardian news API using the `useFetchGuardianNewsQuery` hook.
 * The filters used in the API request are derived from the `useFilters` hook, which provides:
 * - `from`: The start date for fetching articles.
 * - `to`: The end date for fetching articles.
 * - `query`: The search query for filtering articles.
 * - `sources`: The specific news sources to include.
 * - `category`: The category of news to filter by.
 *
 * @returns {Object} An object containing:
 *   - `guardianNewsData` (any): The fetched news data from the Guardian API.
 *   - `isFetchingGuardianNews` (boolean): A boolean indicating if the data is currently being fetched.
 *
 * @example
 * // Example usage in a React component:
 * const { guardianNewsData, isFetchingGuardianNews } = useGuardianNewsData();
 *
 * if (isFetchingGuardianNews) {
 *   return <p>Loading...</p>;
 * }
 *
 * return (
 *   <div>
 *     {guardianNewsData?.articles.map((article) => (
 *       <p key={article.id}>{article.title}</p>
 *     ))}
 *   </div>
 * );
 *
 * @see {@link useFilters} for managing applied filters.
 * @see {@link useFetchGuardianNewsQuery} for querying the Guardian news API.
 */
export function useGuardianNewsData() {
  const { from, to, query, sources, category } = useFilters();

  const { data: guardianNewsData, isFetching: isFetchingGuardianNews } =
    useFetchGuardianNewsQuery({
      to,
      from,
      query,
      sources,
      category,
    });

  return { guardianNewsData, isFetchingGuardianNews };
}
