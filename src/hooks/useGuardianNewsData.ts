import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { useFetchGuardianNewsQuery } from "@/services/newsApi";

export function useGuardianNewsData() {
  const query = useSelector((state: RootState) => state.search.query);
  const filters = useSelector((state: RootState) => state.filters);

  const { from, to, category } = filters;
  const { data: guardianNewsData, isFetching: isFetchingGuardianNews } =
    useFetchGuardianNewsQuery({
      query,
      from,
      to,
      category,
    });

  return { guardianNewsData, isFetchingGuardianNews };
}
