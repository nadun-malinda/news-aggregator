import { sortByDate } from "@/shared/utils/sort";

type Article = {
  title: string;
  publishedAt: string;
};

describe("sortByDate", () => {
  const articles: Article[] = [
    {
      title: "Article 1",
      publishedAt: "2025-01-05T12:00:00Z",
    },
    {
      title: "Article 2",
      publishedAt: "2025-01-06T12:00:00Z",
    },
    {
      title: "Article 3",
      publishedAt: "2025-01-04T12:00:00Z",
    },
  ];

  it("should sort articles by date in descending order by default", () => {
    const result = sortByDate(articles, "publishedAt");

    expect(result[0].title).toBe("Article 2"); // Latest article should be first
    expect(result[1].title).toBe("Article 1");
    expect(result[2].title).toBe("Article 3");
  });

  it("should sort articles by date in ascending order when 'asc' is specified", () => {
    const result = sortByDate(articles, "publishedAt", "asc");

    expect(result[0].title).toBe("Article 3"); // Earliest article should be first
    expect(result[1].title).toBe("Article 1");
    expect(result[2].title).toBe("Article 2");
  });

  it("should return the same array if all articles have the same date", () => {
    const sameDateArticles: Article[] = [
      {
        title: "Article 1",
        publishedAt: "2025-01-05T12:00:00Z",
      },
      {
        title: "Article 2",
        publishedAt: "2025-01-05T12:00:00Z",
      },
      {
        title: "Article 3",
        publishedAt: "2025-01-05T12:00:00Z",
      },
    ];

    const result = sortByDate(sameDateArticles, "publishedAt");

    expect(result).toEqual(sameDateArticles); // The order should remain the same
  });

  it("should return an empty array if the input is an empty array", () => {
    const result = sortByDate([], "publishedAt");

    expect(result).toEqual([]); // An empty array should return an empty array
  });
});
