import { SourcesEnum } from "@/consts/sources";
import { type Article } from "@/services/newsApi";

export function normaliseGuardianNewsData(data: any[]): Article[] {
  return data.map((article: any) => ({
    id: crypto.randomUUID(),
    source: {
      id: SourcesEnum["guardian"],
      name: "The Guardian",
    },
    title: article.webTitle,
    content: article.fields.bodyText,
    image: article.fields.thumbnail,
    author: article.fields.byline,
    category: article.sectionName,
    publishedAt: article.webPublicationDate,
    url: article.webUrl,
  }));
}
