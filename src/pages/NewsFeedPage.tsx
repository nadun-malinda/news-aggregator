import { NewsFeed } from "@/components/news-feed/NewsFeed";
import { Personalize } from "@/components/personalize/Personalize";
import { Search } from "@/components/search/Search";
import { Suspense } from "react";

export function NewsFeedPage() {
  return (
    <div className="grid grid-cols-12 gap-4">
      <div className="col-span-full md:col-span-4 lg:col-span-3">
        <Personalize />
      </div>
      <div className="col-span-full md:col-span-8 lg:col-span-9">
        <Suspense fallback={<div>Loading...</div>}>
          <NewsFeed />
        </Suspense>
      </div>
    </div>
  );
}
