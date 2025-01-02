import {
  Article,
  useFetchGuardianNewsQuery,
  useFetchNewsAPIQuery,
  useFetchNYTNewsQuery,
} from "@/services/newsApi";
import { useEffect } from "react";

export function useFetchAggregatedNews(): Article[] {
  const { data: nytNews } = useFetchNYTNewsQuery("ukrain");
  const { data: newsApiNews } = useFetchNewsAPIQuery("ukrain");
  const { data: guardianNews } = useFetchGuardianNewsQuery("ukrain");

  useEffect(() => {
    console.log(">>> nytNews: ", nytNews);
  }, [nytNews]);

  useEffect(() => {
    console.log(">>> guardianNews: ", guardianNews);
  }, [guardianNews]);

  useEffect(() => {
    console.log(">>> newsApiNews: ", newsApiNews);
  }, [newsApiNews]);

  // spread and return all news in a single array
  return [...(guardianNews ?? []), ...(nytNews ?? []), ...(newsApiNews ?? [])];
}
