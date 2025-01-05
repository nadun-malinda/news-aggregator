import { Article } from "@/types/article";
import { SourcesEnum } from "@/types/source";

export const articles: Article[] = [
  {
    id: "1",
    image: "",
    author: "",
    category: "",
    source: { id: SourcesEnum["bbc-news"], name: "BBC News" },
    title: "BBC News Article 1",
    content: "Desription of BBC News Article 1",
    url: "https://example.com/bbc-news-article-1",
    publishedAt: "2025-01-05T12:00:00Z",
  },
  {
    id: "2",
    image: "",
    author: "",
    category: "",
    source: { id: SourcesEnum["nyt"], name: "The New York Times" },
    title: "NYT Article 1",
    content: "Desription of NYT Article 1",
    url: "https://example.com/nyt-article-1",
    publishedAt: "2025-01-05T13:00:00Z",
  },
  {
    id: "3",
    image: "",
    author: "",
    category: "",
    source: { id: SourcesEnum["guardian"], name: "The Guardian" },
    title: "Guardian Article 1",
    content: "Desription of Guardian Article 1",
    url: "https://example.com/guardian-article-1",
    publishedAt: "2025-01-05T14:00:00Z",
  },
  {
    id: "4",
    image: "",
    author: "",
    category: "",
    source: { id: SourcesEnum["bbc-news"], name: "BBC News" },
    title: "BBC News Article 2",
    content: "Desription of BBC News Article 2",
    url: "https://example.com/bbc-news-article-2",
    publishedAt: "2025-01-05T15:00:00Z",
  },
];
