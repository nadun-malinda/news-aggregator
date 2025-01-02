import { useFetchAggregatedNews } from "@/hooks/useFetchAggregatedNews";
import { useEffect } from "react";

export function NewsFeed() {
  const news = useFetchAggregatedNews();

  useEffect(() => {
    console.log(">>> NEWS: ", news);
  }, [news]);

  return (
    <>
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
    </>
  );
}
