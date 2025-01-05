import { SourcesEnum } from "@/shared/consts/sources";
import { type Article } from "@/services/newsApi";

/**
 * Normalizes The Guardian news data into a standard format.
 *
 * @param {Array<Record<string, any>>} data - The raw data from The Guardian API.
 * @returns {Article[]} - An array of normalized articles.
 *
 * @example
 * const rawData = [
 *   {
 *     webTitle: "Example Title",
 *     fields: {
 *       bodyText: "This is the article content.",
 *       thumbnail: "https://example.com/image.jpg",
 *       byline: "Author Name",
 *     },
 *     sectionName: "World News",
 *     webPublicationDate: "2023-01-01T12:00:00Z",
 *     webUrl: "https://example.com/article",
 *   },
 * ];
 *
 * const articles = normaliseGuardianNewsData(rawData);
 * console.log(articles);
 * // Output: [
 * //   {
 * //     id: "generated-id",
 * //     source: { id: "guardian", name: "The Guardian" },
 * //     title: "Example Title",
 * //     content: "This is the article content.",
 * //     image: "https://example.com/image.jpg",
 * //     author: "Author Name",
 * //     category: "World News",
 * //     publishedAt: "2023-01-01T12:00:00Z",
 * //     url: "https://example.com/article",
 * //   },
 * // ]
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
