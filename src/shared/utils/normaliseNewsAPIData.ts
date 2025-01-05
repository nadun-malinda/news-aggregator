import { Article } from "@/types/article";

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
