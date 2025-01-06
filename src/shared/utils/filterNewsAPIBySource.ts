import { Article } from "@/types/article";
import { SourceId, SourcesEnum } from "@/types/source";

/**
 * Filters a list of news articles by the specified sources, excluding specific sources that are fetched separately.
 *
 * This function filters the articles based on their source IDs. It excludes articles from sources that are
 * fetched separately (e.g., New York Times and Guardian) to avoid duplication.
 *
 * @param {Article[]} articles - The list of articles to be filtered.
 * @param {SourceId[]} [sources] - The list of source IDs to filter by. If not provided, all articles are returned.
 *
 * @returns {Article[]} A filtered list of articles based on the selected sources.
 */
export function filterNewsAPIBySource(
  articles: Article[],
  sources?: SourceId[]
): Article[] {
  if (!sources) return articles;

  // Return articles based on the selected source
  return articles.filter(
    (article) =>
      sources.includes(article.source.id) &&
      article.source.id !== SourcesEnum["nyt"] && // Already fetching NYT news separately
      article.source.id !== SourcesEnum["guardian"] // Already fetching Guardian news separately
  );
}
