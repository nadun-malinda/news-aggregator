import { filterNewsAPIBySource } from "@/shared/utils/filterNewsAPIBySource";
import { SourcesEnum } from "@/types/source";
import { Article } from "@/types/article";

describe("filterNewsAPIBySource", () => {
  const articles: Article[] = [
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

  it("should return all articles when no sources are provided", () => {
    const result = filterNewsAPIBySource(articles);

    expect(result).toHaveLength(4); // All articles should be returned
  });

  it("should filter articles based on the provided sources", () => {
    const result = filterNewsAPIBySource(articles, [SourcesEnum["bbc-news"]]);

    expect(result).toHaveLength(2); // Should return only BBC articles
    expect(result[0].source.id).toBe(SourcesEnum["bbc-news"]);
    expect(result[1].source.id).toBe(SourcesEnum["bbc-news"]);
  });

  it("should exclude NYT and Guardian articles when sources are provided", () => {
    const result = filterNewsAPIBySource(articles, [SourcesEnum["bbc-news"]]);

    expect(result).toHaveLength(2); // Only BBC articles should be returned
    expect(result[0].source.id).toBe(SourcesEnum["bbc-news"]);
    expect(result[1].source.id).toBe(SourcesEnum["bbc-news"]);
  });

  it("should return an empty array if no articles match the selected sources", () => {
    const result = filterNewsAPIBySource(articles, ["cnn"] as any);

    expect(result).toHaveLength(0); // No articles should match the CNN source
  });
});
