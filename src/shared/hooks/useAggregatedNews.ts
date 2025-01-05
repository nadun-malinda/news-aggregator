import { sortByDate } from "@/shared/utils/sort";
import { useNewsAPIData } from "@/shared/hooks/useNewsAPIData";
import { useNYTNewsData } from "@/shared/hooks/useNYTNewsData";
import { useGuardianNewsData } from "@/shared/hooks/useGuardianNewsData";
import { Article } from "@/types/article";

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
