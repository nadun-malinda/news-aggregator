import {
  Article,
  useFetchGuardianNewsQuery,
  useFetchNewsAPIQuery,
  useFetchNYTNewsQuery,
} from "@/services/newsApi";

export function useFetchAggregatedNews(): Article[] {
  const { data: guardianNews } = useFetchGuardianNewsQuery("");
  const { data: nytNews } = useFetchNYTNewsQuery("");
  const { data: newsApiNews } = useFetchNewsAPIQuery("");

  // spread and return all news in a single array
  return [
    ...(guardianNews ?? []),
    ...(nytNews ?? []),
    ...(Array.isArray(newsApiNews) ? newsApiNews : []),
  ];
}
