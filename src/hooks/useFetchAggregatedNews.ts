import { useSelector } from "react-redux";
import { RootState } from "@/state/store";
import {
  Article,
  useFetchGuardianNewsQuery,
  useFetchNewsAPIQuery,
  useFetchNYTNewsQuery,
} from "@/services/newsApi";
import { useLocation } from "react-router-dom";
import { SourcesEnum } from "@/consts/sources";
import { sortByDate } from "@/lib/utils/sort";

export function useFetchAggregatedNews(): {
  data: Article[];
  isFetching: boolean;
} {
  const query = useSelector((state: RootState) => state.search.query);
  const filters = useSelector((state: RootState) => state.filters);
  const location = useLocation();

  const { from, to, category, sources } = filters;

  const { data: nytNews, isFetching: isFetchingNYTNews } = useFetchNYTNewsQuery(
    {
      query,
      from,
      to,
      category,
    }
  );
  const { data: newsApiNews, isFetching: isFetchingNewsApiNews } =
    useFetchNewsAPIQuery({
      query,
      from,
      to,
      category,
      source:
        location.pathname === "/search" &&
        sources.includes(SourcesEnum["bbc-news"])
          ? SourcesEnum["bbc-news"]
          : undefined,
    });
  const { data: guardianNews, isFetching: isFetchingGuardianNews } =
    useFetchGuardianNewsQuery({
      query,
      from,
      to,
      category,
    });

  // spread and return all news in a single array
  return {
    data: sortByDate(
      [...(nytNews ?? []), ...(guardianNews ?? []), ...(newsApiNews ?? [])],
      "publishedAt",
      "desc"
    ),
    isFetching:
      isFetchingNYTNews || isFetchingNewsApiNews || isFetchingGuardianNews,
  };
}
