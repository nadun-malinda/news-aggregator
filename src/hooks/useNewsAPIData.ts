import { useFilters } from "@/hooks/useFilters";
import { useFetchNewsAPIQuery } from "@/services/newsApi";

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