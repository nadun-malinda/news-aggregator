import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { useFetchNYTNewsQuery } from "@/services/newsApi";
import { useEffect } from "react";

export function useNYTNewsData() {
  const query = useSelector((state: RootState) => state.search.query);
  const filters = useSelector((state: RootState) => state.filters);

  const { from, to, category } = filters;
  const { data: nytNewsData, isFetching: isFetchingNYTNews } =
    useFetchNYTNewsQuery({
      query,
      from,
      to,
      category,
    });

  useEffect(() => {
    console.log(">>> NYT News Data: ", nytNewsData);
  }, [nytNewsData]);

  return { nytNewsData, isFetchingNYTNews };
}
