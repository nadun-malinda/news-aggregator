import { Filters } from "@/components/filters/Filters";
import { NewsResults } from "@/components/news/NewsResults";
import { useAggregatedNews } from "@/shared/hooks/useAggregatedNews";

export function SearchPage() {
  const { data: news, isFetching } = useAggregatedNews();

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-full md:col-span-4 lg:col-span-3">
        <Filters />
      </div>
      <div className="col-span-full md:col-span-8 lg:col-span-9">
        {isFetching ? <p>Loading...</p> : <NewsResults news={news} />}
      </div>
    </div>
  );
}
