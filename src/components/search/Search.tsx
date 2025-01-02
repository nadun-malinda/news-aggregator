import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDebouncedCallback } from "@/hooks/useDebouncedCallback";
import { useEffect, useState } from "react";

export function Search() {
  const [searchText, setSearchText] = useState("");
  const debouncedCallback = useDebouncedCallback(
    ({ searchText }: { searchText: string }) =>
      setSearchWithDebounce({ searchText }),
    1000
  );

  useEffect(() => {
    console.log(">>> searchText: ", searchText);
  }, [searchText]);

  const setSearchWithDebounce = ({ searchText }: { searchText: string }) => {
    setSearchText(searchText);
  };

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
