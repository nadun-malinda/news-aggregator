import { SourcesEnum } from "@/shared/consts/sources";
import { Article } from "@/types/article";

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
