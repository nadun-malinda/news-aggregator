import { CATEGORY_ID, CategoryId } from "@/consts/categories";
import { type SourceId, type Source } from "@/consts/sources";
import { filterNewsAPIBySource } from "@/lib/utils/filterNewsAPIBySource";
import { normaliseGuardianNewsData } from "@/lib/utils/normaliseGuardianNewsData";
import { normaliseNewsAPIData } from "@/lib/utils/normaliseNewsAPIData";
import { normaliseNYTNewsData } from "@/lib/utils/normaliseNYTNewsData";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Article {
  id: string;
  source: Source;
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
    fetchNewsAPI: builder.query<
      Article[],
      {
        query: string;
        from: string;
        to: string;
        category?: CategoryId;
        source?: SourceId;
      }
    >({
      query: ({ query, from, to, category }) => ({
        url: process.env.REACT_APP_NEWSAPI_URL || "",
        params: {
          q: query || "all",
          apiKey: process.env.REACT_APP_NEWSAPI_KEY,
          pageSize: 10,
          sortBy: "publishedAt",
          startDate: from,
          // endDate: to,
          category: category === CATEGORY_ID["all"] ? "" : category,
        },
      }),
      transformResponse: (response: any, _, { source }) => {
        const normalisedData = normaliseNewsAPIData(response.articles);
        return filterNewsAPIBySource(normalisedData, source);
      },
    }),

    fetchGuardianNews: builder.query<
      Article[],
      {
        query: string;
        from: string;
        to: string;
        category?: CategoryId;
        source?: SourceId;
      }
    >({
      query: ({ query, from, to, category }) => {
        let params = {
          "api-key": process.env.REACT_APP_GUARDIAN_API_KEY,
          "show-fields": "all",
          "show-blocks": "all",
          "page-size": 10,
          "order-by": "newest",
          q: query,
          "from-date": from,
          // "to-date": to,
          "show-tags": "all",
        } as any;

        if (category !== CATEGORY_ID["all"]) {
          params.section = category;
        }

        return {
          url: process.env.REACT_APP_GUARDIAN_API_URL || "",
          params,
        };
      },
      transformResponse: (response: any) => {
        return normaliseGuardianNewsData(response.response.results);
      },
    }),

    fetchNYTNews: builder.query<
      Article[],
      {
        query: string;
        from: string;
        to: string;
        category?: CategoryId;
        source?: SourceId;
      }
    >({
      query: ({ query, from, to, category }) => ({
        url: process.env.REACT_APP_NYT_API_URL || "",
        params: {
          query: query,
          "api-key": process.env.REACT_APP_NYT_API_KEY,
          fq: category,
          sort: "newest",
          page: 0,
          begin_date: from,
          end_date: to,
        },
      }),
      transformResponse: (response: any) => {
        return normaliseNYTNewsData(response.response.docs);
      },
    }),
  }),
});

export const {
  useFetchNewsAPIQuery,
  useFetchGuardianNewsQuery,
  useFetchNYTNewsQuery,
} = newsApi;
