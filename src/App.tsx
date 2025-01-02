import "./App.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useFetchGuardianNewsQuery,
  useFetchNewsAPIQuery,
  useFetchNYTNewsQuery,
} from "./services/newsApi";
import { useEffect } from "react";
import { useFetchAggregatedNews } from "./hooks/useFetchAggregatedNews";

function App() {
  const { data: guardianNews } = useFetchGuardianNewsQuery("");
  const { data: nytNews } = useFetchNYTNewsQuery("");
  const { data: newsApiNews } = useFetchNewsAPIQuery("");
  const news = useFetchAggregatedNews();

  useEffect(() => {
    console.log(">>> NEWS: ", news);
  }, [news]);

  useEffect(() => {
    console.log(">>> guardianNews: ", guardianNews);
  }, [guardianNews]);

  useEffect(() => {
    console.log(">>> nytNews: ", nytNews);
  }, [nytNews]);

  useEffect(() => {
    console.log(">>> newsApiNews: ", newsApiNews);
  }, [newsApiNews]);

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <p className="text-lg">News Aggregator</p>
      <div className="flex gap-2">
        <Input type="text" placeholder="Search" />
        <Button>Click me</Button>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-2 my-4">
        {news.map((article) => (
          <a
            key={article.id}
            href={article.url || ""}
            target="_blank"
            rel="noreferrer"
          >
            <div className="border rounded-sm overflow-hidden">
              <div className="h-[250px] md:h-[180px] overflow-hidden">
                <img
                  src={article.image || "https://placehold.co/600x400@2x.png"}
                  alt={article.title}
                  className="w-full aspect-auto"
                />
              </div>
              <div className="p-2">
                <p className="text-md font-semibold">{article.title}</p>
                <p className="text-sm">{article.source}</p>
                <p className="text-sm">{article.publishedAt}</p>
                <p className="text-sm">{article.category}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default App;
