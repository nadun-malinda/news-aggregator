import { sortByDate } from "@/shared/utils/sort";
import { useNewsAPIData } from "@/shared/hooks/useNewsAPIData";
import { useNYTNewsData } from "@/shared/hooks/useNYTNewsData";
import { useGuardianNewsData } from "@/shared/hooks/useGuardianNewsData";
import { Article } from "@/types/article";

/**
 * Custom hook to aggregate news articles from multiple sources (NYT, Guardian, and NewsAPI).
 *
 * This hook fetches news data from the following sources:
 * - New York Times (NYT)
 * - Guardian
 * - NewsAPI
 *
 * The fetched articles are combined, sorted by their published date, and returned.
 * The hook also provides a fetching status indicating if any of the sources are still being fetched.
 *
 * @returns {Object} An object containing the following properties:
 *   - `data` (Article[]): The aggregated and sorted list of news articles.
 *   - `isFetching` (boolean): A boolean indicating if any of the sources are still fetching data.
 *
 * @see {@link useNYTNewsData} for fetching New York Times articles.
 * @see {@link useNewsAPIData} for fetching NewsAPI articles.
 * @see {@link useGuardianNewsData} for fetching Guardian articles.
 * @see {@link sortByDate} for sorting the articles by their published date.
 */
export function useAggregatedNews(): {
  data: Article[];
  isFetching: boolean;
} {
  const { nytNewsData, isFetchingNYTNews } = useNYTNewsData();
  const { newsAPIData, isFetchingNewsApiNews } = useNewsAPIData();
  const { guardianNewsData, isFetchingGuardianNews } = useGuardianNewsData();

  // spread and return all news in a single array
  const aggregatedNews = [
    ...(nytNewsData ?? []),
    ...(guardianNewsData ?? []),
    ...(newsAPIData ?? []),
  ];
  const sortedNews = sortByDate(aggregatedNews, "publishedAt", "desc");

  return {
    data: sortedNews,
    isFetching:
      isFetchingNYTNews || isFetchingNewsApiNews || isFetchingGuardianNews,
  };
}
