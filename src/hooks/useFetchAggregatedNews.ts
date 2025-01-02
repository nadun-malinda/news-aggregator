import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  Article,
  useFetchGuardianNewsQuery,
  useFetchNewsAPIQuery,
  useFetchNYTNewsQuery,
} from "@/services/newsApi";

export function useFetchAggregatedNews(): Article[] {
  const query = useSelector((state: RootState) => state.search.query);

  const { data: nytNews } = useFetchNYTNewsQuery(query);
  const { data: newsApiNews } = useFetchNewsAPIQuery(query);
  const { data: guardianNews } = useFetchGuardianNewsQuery(query);

  // spread and return all news in a single array
  return [...(guardianNews ?? []), ...(nytNews ?? []), ...(newsApiNews ?? [])];
}
