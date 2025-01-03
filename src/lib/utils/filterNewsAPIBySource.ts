import { type SourceId } from "@/consts/sources";
import { Article } from "@/services/newsApi";

export function filterNewsAPIBySource(articles: Article[], source?: SourceId) {
  // Return 'bbc-news' articles if no source is selected
  if (!source) return articles;

  // Return articles based on the selected source
  return articles.filter((article) => article.source.id === source);
}
