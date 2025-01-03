import { SourcesEnum } from "@/consts/sources";
import { type Article } from "@/services/newsApi";

export function normaliseNYTNewsData(data: any[]): Article[] {
  return data.map((article: any) => ({
    id: crypto.randomUUID(),
    source: {
      id: SourcesEnum["nyt"],
      name: "The New York Times",
    },
    title: article.headline.main,
    content: article.abstract,
    image:
      article.multimedia[0]?.url &&
      `https://www.nytimes.com/${article.multimedia[0]?.url}`,
    author: article.byline.original,
    category: article.news_desk,
    publishedAt: article.pub_date,
    url: article.web_url,
  }));
}
