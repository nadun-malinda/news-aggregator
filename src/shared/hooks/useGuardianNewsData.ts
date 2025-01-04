import { useFilters } from "@/shared/hooks/useFilters";
import { useFetchGuardianNewsQuery } from "@/services/newsApi";

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
