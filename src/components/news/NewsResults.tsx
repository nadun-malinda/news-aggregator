import { PLACEHOLDER_IMAGE_URL } from "@/shared/config/imageConfig";
import { DEFAULT_DATE_FORMAT } from "@/shared/consts/date";
import { RootState } from "@/state/store";
import { Article } from "@/types/article";
import { format } from "date-fns";
import { ExternalLink, Newspaper } from "lucide-react";
import { useSelector } from "react-redux";

export function NewsResults({ news }: { news: Article[] }) {
  const search = useSelector((store: RootState) => store.search);

  return (
    <>
      <p className="mb-4">{`Showing ${news.length} ${
        search.query && "search"
      } results`}</p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {news.map((article) => (
          <a
            key={article.id}
            href={article.url || ""}
            target="_blank"
            rel="noreferrer"
            className="h-full group overflow-hidden border rounded-lg flex flex-col md:relative"
          >
            {article.image && (
              <div className="overflow-hidden h-[200px]">
                <img
                  src={article.image || PLACEHOLDER_IMAGE_URL}
                  alt={article.title}
                  className="w-full aspect-auto rounded-t-md h-full object-cover md:group-hover:scale-105 md:duration-500 md:ease-out"
                />
              </div>
            )}
            <div className="p-2 md:pb-10 flex flex-col justify-between gap-2">
              <p className="text-md font-semibold group-hover:underline underline-offset-2 transition">
                {article.title}
              </p>
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Newspaper size={16} strokeWidth={1.5} />
                  <p className="text-sm font-medium">{article.source.name}</p>
                </div>
                <p className="text-sm">
                  {format(article.publishedAt || "", DEFAULT_DATE_FORMAT)}
                </p>
                <p className="text-sm mb-2">{article.category}</p>
                <p className="text-sm">by: {article.author}</p>
              </div>

              <div className="flex items-center gap-1 group-hover:underline md:absolute bottom-2 left-2 mt-4 md:mt-0">
                <ExternalLink size={16} strokeWidth={1.5} />
                <p className="text-sm font-medium">Read more </p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </>
  );
}
