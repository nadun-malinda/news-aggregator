import { Article } from "@/types/article";
import { SourceId, SourcesEnum } from "@/types/source";

export function filterNewsAPIBySource(
  articles: Article[],
  sources?: SourceId[]
) {
  if (!sources) return articles;

  // Return articles based on the selected source
  return articles.filter(
    (article) =>
      sources.includes(article.source.id) &&
      article.source.id !== SourcesEnum["nyt"] && // Already fetching NYT news separately
      article.source.id !== SourcesEnum["guardian"] // Already fetching Guardian news separately
  );
}
