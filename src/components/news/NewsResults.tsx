import { PLACEHOLDER_IMAGE_URL } from "@/shared/config/imageConfig";
import { DEFAULT_DATE_FORMAT } from "@/shared/consts/date";
import { Article } from "@/types/article";
import { format } from "date-fns";

export function NewsResults({ news }: { news: Article[] }) {
  return (
    <>
      <p className="mb-4">{`Showing ${news.length} results`}</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
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
                src={article.image || PLACEHOLDER_IMAGE_URL}
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
                  {format(article.publishedAt || "", DEFAULT_DATE_FORMAT)}
                </p>
                <p className="text-sm">{article.category}</p>
                <p className="text-sm">{article.author}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
