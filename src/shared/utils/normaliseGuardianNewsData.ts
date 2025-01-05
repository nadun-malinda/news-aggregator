import { Article } from "@/types/article";
import { SourcesEnum } from "@/types/source";

/**
 * Normalizes The Guardian news data into a standard format.
 *
 * @param {Array<Record<string, any>>} data - The raw data from The Guardian API.
 * @returns {Article[]} - An array of normalized articles.
 */
export function normaliseGuardianNewsData(
  data: Array<Record<string, any>>
): Article[] {
  return data.map((article) => {
    const fields = article.fields || {};

    return {
      id: article.id,
      source: {
        id: SourcesEnum["guardian"],
        name: "The Guardian",
      },
      title: article.webTitle || "Untitled",
      content: fields.bodyText || null,
      image: fields.thumbnail || null,
      author: fields.byline || null,
      category: article.sectionName || "Uncategorized",
      publishedAt: article.webPublicationDate || null,
      url: article.webUrl || null,
    };
  });
}
