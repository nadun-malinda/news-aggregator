import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { useFetchNewsAPIQuery } from "@/services/newsApi";
import { useLocation } from "react-router-dom";
import { SourcesEnum } from "@/consts/sources";

export function useNewsAPIData() {
  const query = useSelector((state: RootState) => state.search.query);
  const filters = useSelector((state: RootState) => state.filters);
  const location = useLocation();

  const { from, to, category, sources } = filters;
  const { data: newsAPIData, isFetching: isFetchingNewsApiNews } =
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

  return { newsAPIData, isFetchingNewsApiNews };
}
