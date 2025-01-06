import { Filters } from "@/components/filters/Filters";
import { NewsResults } from "@/components/news/NewsResults";
import { useAggregatedNews } from "@/shared/hooks/useAggregatedNews";
import { ChevronLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function SearchPage() {
  const { data: news, isFetching } = useAggregatedNews();

  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-full md:col-span-4 lg:col-span-3">
        <Filters />
      </div>
      <div className="col-span-full md:col-span-8 lg:col-span-9">
        <Link
          to="/"
          className="font-semibold underline underline-offset-2 mb-6 flex gap-2 -ml-2"
        >
          <ChevronLeft strokeWidth={1.5} />
          <span>Go back to News Feed</span>
        </Link>
        {isFetching ? <p>Loading...</p> : <NewsResults news={news} />}
      </div>
    </div>
  );
}
