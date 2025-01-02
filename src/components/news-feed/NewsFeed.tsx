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
          className="h-full group overflow-hidden"
        >
          <div className="h-[250px] md:h-[180px] overflow-hidden rounded-lg">
            <img
              src={article.image || "https://placehold.co/600x400@2x.png"}
              alt={article.title}
              className="w-full aspect-auto rounded-md"
            />
          </div>
          <div className="py-2 flex flex-col justify-between">
            <p className="text-md font-semibold mb-2 group-hover:underline underline-offset-2 transition">
              {article.title}
            </p>
            <div>
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
