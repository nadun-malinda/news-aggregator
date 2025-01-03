import { useAggregatedNews } from "@/hooks/useAggregatedNews";
import { format } from "date-fns";
import { useEffect } from "react";

export function NewsFeed() {
  const { data: news, isFetching } = useAggregatedNews();

  useEffect(() => {
    console.log(">>> news: ", news);
  }, [news]);

  if (isFetching) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <p className="mb-4">{`Showing ${news.length} results`}</p>
      <div className="grid md:grid-cols-3 gap-4 my-4">
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
                <p className="text-sm">{article.source.name}</p>
                <p className="text-sm">
                  {format(article.publishedAt || "", "yyyy-MM-dd")}
                </p>
                <p className="text-sm">{article.category}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
