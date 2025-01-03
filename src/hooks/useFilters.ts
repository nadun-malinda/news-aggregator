import { RootState } from "@/state/store";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

export function useFilters() {
  const location = useLocation();

  const query = useSelector((state: RootState) => state.search.query);
  const filters = useSelector((state: RootState) => state.filters);
  const savedFilters = useSelector((state: RootState) => state.savedFilters);

  const getSources = () => {
    if (location.pathname === "/") {
      return savedFilters.sources;
    }

    return filters.sources;
  };

  return {
    query,
    to: filters.to,
    from: filters.from,
    sources: getSources(),
    category: filters.category,
  };
}
