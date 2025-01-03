import { Input } from "@/components/ui/input";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useDispatch } from "react-redux";
import { setQuery } from "@/state/searchSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function Search() {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  useEffect(() => {
    const queryInUrl = searchParams.get("q") || "";

    // Upadet the search input value if it is available in the URL
    setSearch(queryInUrl);

    // Update the search query in the store
    dispatch(setQuery(queryInUrl));
    console.log(">>> searchParams: ", searchParams.get("q"));
  }, [dispatch, searchParams]);

  const debouncedCallback = useDebouncedCallback(
    ({ searchText }: { searchText: string }) => {
      console.log(">>> DEBOUNCING...");
      dispatch(setQuery(searchText));
      navigate(`/search?q=${searchText}`);
    },
    1000
  );

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    debouncedCallback({ searchText: e.target.value });
  };

  return (
    <div className="flex gap-2 min-w-[300px]">
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearchText}
      />
    </div>
  );
}
