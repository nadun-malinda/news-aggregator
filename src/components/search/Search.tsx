import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useDispatch } from "react-redux";
import { setQuery } from "@/state/searchSlice";

export function Search() {
  const dispatch = useDispatch();

  const debouncedCallback = useDebouncedCallback(
    ({ searchText }: { searchText: string }) => dispatch(setQuery(searchText)),
    1000
  );

  const handleSearchText = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedCallback({ searchText: e.target.value });
  };

  return (
    <div className="flex gap-2">
      <Input type="text" placeholder="Search" onChange={handleSearchText} />
      <Button>Click me</Button>
    </div>
  );
}
