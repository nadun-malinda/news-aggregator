import { Article } from "@/types/article";

/**
 * Normalizes raw NewsAPI data into a standardized format for use in the application.
 *
 * This function converts the raw data received from the NewsAPI into an array of `Article` objects.
 * Since the NewsAPI response does not include unique IDs, a random UUID is generated for each article.
 *
 * @param {any[]} data - The raw data array from the NewsAPI response.
 *
 * @returns {Article[]} An array of normalized `Article` objects.
 */
export function normaliseNewsAPIData(data: any[]): Article[] {
  return data.map((article: any) => ({
    id: crypto.randomUUID(), // NewsAPI response doesn't have an id field :(
    source: {
      id: article.source.id,
      name: article.source.name,
    },
    title: article.title,
    content: article.description,
    image: article.urlToImage,
    author: article.author,
    category: article.source.name,
    publishedAt: article.publishedAt,
    url: article.url,
  }));
}
