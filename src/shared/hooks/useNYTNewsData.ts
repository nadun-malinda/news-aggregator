import { useFilters } from "@/shared/hooks/useFilters";
import { useFetchNYTNewsQuery } from "@/services/aggregatedNewsApi";

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
