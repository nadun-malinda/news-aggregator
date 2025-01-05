import { useFilters } from "@/shared/hooks/useFilters";
import { useFetchNewsAPIQuery } from "@/services/aggregatedNewsApi";

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
