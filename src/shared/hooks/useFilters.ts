import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { RootState } from "@/state/store";

/**
 * Custom hook to retrieve filters and query parameters based on the current route.
 *
 * - For the `/` route, uses saved filters.
 * - For other routes, uses active filters from the Redux store.
 *
 * @returns {Object} Filter and query parameters:
 * - `query` {string} The current search query.
 * - `to` {string | undefined} The "to" filter date (only for non-root routes).
 * - `from` {string | undefined} The "from" filter date (only for non-root routes).
 * - `sources` {string[]} The list of sources for the current route.
 * - `category` {string} The category filter for the current route.
 *
 * @example
 * const { query, from, to, sources, category } = useFilters();
 * console.log(query); // Logs the current search query.
 */
export function useFilters() {
  const location = useLocation();

  const { query } = useSelector((state: RootState) => state.search);
  const { category, sources, to, from } = useSelector(
    (state: RootState) => state.filters
  );
  const savedFilters = useSelector((state: RootState) => state.savedFilters);

  const isRootRoute = location.pathname === "/";

  return {
    query,
    to: isRootRoute ? undefined : to,
    from: isRootRoute ? undefined : from,
    sources: isRootRoute ? savedFilters.sources : sources,
    category: isRootRoute ? savedFilters.category : category,
  };
}
