import { Article } from "@/types/article";
import { SourcesEnum } from "@/types/source";

/**
 * Normalizes raw New York Times (NYT) API data into a standardized format for use in the application.
 *
 * This function converts the raw data received from the NYT API into an array of `Article` objects.
 * It extracts and maps fields such as title, content, image, author, category, published date, and URL.
 *
 * @param {any[]} data - The raw data array from the NYT API response.
 *
 * @returns {Article[]} An array of normalized `Article` objects.
 */
export function normaliseNYTNewsData(data: any[]): Article[] {
  return data.map((article: any) => ({
    id: article._id,
    source: {
      id: SourcesEnum["nyt"],
      name: "The New York Times",
    },
    title: article.headline.main,
    content: article.abstract,
    image:
      article.multimedia[0]?.url &&
      `https://www.nytimes.com/${article.multimedia[0]?.url}`,
    author: `${article.byline.person[0]?.firstname || ""} ${
      article.byline.person[0]?.lastname || ""
    }`,
    category: article.news_desk,
    publishedAt: article.pub_date,
    url: article.web_url,
  }));
}
