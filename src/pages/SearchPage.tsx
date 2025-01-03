import { Filters } from "@/components/filters/Filters";
import { NewsFeed } from "@/components/news-feed/NewsFeed";

export function SearchPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-full md:col-span-4 lg:col-span-3">
        <Filters />
      </div>
      <div className="col-span-full md:col-span-8 lg:col-span-9">
        <NewsFeed />
      </div>
    </div>
  );
}
