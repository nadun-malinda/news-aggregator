import { Search } from "@/components/search/Search";
import { NewsFeed } from "./components/news-feed/NewsFeed";
import { Suspense } from "react";

function App() {
  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <p className="text-lg">News Aggregator</p>

      <Search />

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 my-4">
        <Suspense fallback={<div>Loading...</div>}>
          <NewsFeed />
        </Suspense>
      </div>
    </div>
  );
}

export default App;
