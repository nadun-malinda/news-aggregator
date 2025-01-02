import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Article {
  id: string;
  source: string;
  title: string;
  content: string | null;
  image: string | null;
  author: string | null;
  category: string | null;
  publishedAt: string | null;
  url: string | null;
}

export const newsApi = createApi({
  reducerPath: "newsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/" }),
  endpoints: (builder) => ({
    fetchNewsAPI: builder.query<Article[], string>({
      query: (query: string) => ({
        url: process.env.REACT_APP_NEWSAPI_URL || "",
        params: {
          q: query,
          apiKey: process.env.REACT_APP_NEWSAPI_KEY,
          pageSize: 10,
        },
      }),
      transformResponse: (response: any) => {
        return response.articles.map((article: any) => ({
          id: crypto.randomUUID(),
          source: article.source.name,
          title: article.title,
          content: article.description,
          image: article.urlToImage,
          author: article.author,
          category: article.source.name,
          publishedAt: article.publishedAt,
          url: article.url,
        }));
      },
    }),

    fetchGuardianNews: builder.query<Article[], string>({
      query: (query: string) => ({
        url: process.env.REACT_APP_GUARDIAN_API_URL || "",
        params: {
          "api-key": process.env.REACT_APP_GUARDIAN_API_KEY,
          "show-fields": "all",
          "show-blocks": "all",
          "page-size": 10,
          "order-by": "newest",
          q: query,
          section: "technology",
          "from-date": "2021-01-01",
          "to-date": "2021-12-31",
          "show-tags": "all",
        },
      }),
      transformResponse: (response: any) => {
        return response.response.results.map((article: any) => ({
          id: crypto.randomUUID(),
          source: "The Guardian",
          title: article.webTitle,
          content: article.fields.bodyText,
          image: article.fields.thumbnail,
          author: article.fields.byline,
          category: article.sectionName,
          publishedAt: article.webPublicationDate,
          url: article.webUrl,
        }));
      },
    }),

    fetchNYTNews: builder.query<Article[], string>({
      query: (query: string) => ({
        url: process.env.REACT_APP_NYT_API_URL || "",
        params: {
          query: query,
          "api-key": process.env.REACT_APP_NYT_API_KEY,
          fq: "technology",
          sort: "newest",
          page: 0,
          begin_date: "20210101",
          end_date: "20211231",
        },
      }),
      transformResponse: (response: any) => {
        return response.response.docs.map((article: any) => ({
          id: crypto.randomUUID(),
          source: "The New York Times",
          title: article.headline.main,
          content: article.abstract,
          image: `https://www.nytimes.com/${article.multimedia[0]?.url}`,
          author: article.byline.original,
          category: article.section_name,
          publishedAt: article.pub_date,
          url: article.web_url,
        }));
      },
    }),
  }),
});

export const {
  useFetchNewsAPIQuery,
  useFetchGuardianNewsQuery,
  useFetchNYTNewsQuery,
} = newsApi;
