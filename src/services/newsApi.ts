import { CategoryEnum, CategoryId } from "@/shared/consts/categories";
import {
  type SourceId,
  type Source,
  SourcesEnum,
} from "@/shared/consts/sources";
import { filterNewsAPIBySource } from "@/shared/utils/filterNewsAPIBySource";
import { normaliseGuardianNewsData } from "@/shared/utils/normaliseGuardianNewsData";
import { normaliseNewsAPIData } from "@/shared/utils/normaliseNewsAPIData";
import { normaliseNYTNewsData } from "@/shared/utils/normaliseNYTNewsData";
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
        sources: SourceId[];
      }
    >({
      queryFn: async (
        { query, from, to, category, sources },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) => {
        if (!sources.includes(SourcesEnum["bbc-news"])) {
          return { data: [] };
        }

        const result: any = await fetchWithBQ({
          url: process.env.REACT_APP_NEWSAPI_URL || "",
          params: {
            q: query || "all",
            apiKey: process.env.REACT_APP_NEWSAPI_KEY,
            pageSize: 10,
            sortBy: "publishedAt",
            startDate: from,
            category: category === CategoryEnum["all"] ? "" : category,
          },
        });

        if (result.error) {
          return { error: result.error };
        }

        const normalisedData = normaliseNewsAPIData(result.data.articles);
        return {
          data: filterNewsAPIBySource(normalisedData, sources),
        };
      },
    }),

    fetchGuardianNews: builder.query<
      Article[],
      {
        query: string;
        from: string;
        to: string;
        category?: CategoryId;
        sources: SourceId[];
      }
    >({
      queryFn: async (
        { query, from, to, category, sources },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) => {
        if (!sources.includes(SourcesEnum["guardian"])) {
          return { data: [] };
        }

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

        if (category !== CategoryEnum["all"]) {
          params.section = category;
        }

        const result: any = await fetchWithBQ({
          url: process.env.REACT_APP_GUARDIAN_API_URL || "",
          params,
        });

        if (result.error) {
          return { error: result.error };
        }

        return {
          data: normaliseGuardianNewsData(result.data.response.results),
        };
      },
    }),

    fetchNYTNews: builder.query<
      Article[],
      {
        query: string;
        from: string;
        to: string;
        category?: CategoryId;
        sources: SourceId[];
      }
    >({
      queryFn: async (
        { query, from, to, category, sources },
        _queryApi,
        _extraOptions,
        fetchWithBQ
      ) => {
        if (!sources.includes(SourcesEnum["nyt"])) {
          return { data: [] };
        }

        const result: any = await fetchWithBQ({
          url: process.env.REACT_APP_NYT_API_URL || "",
          params: {
            query: query,
            "api-key": process.env.REACT_APP_NYT_API_KEY,
            // fq: `source:("The New York Times") AND section_name:("Business")`,
            section_name: category,
            sort: "newest",
            page: 0,
            begin_date: from,
            // end_date: to,
          },
        });

        if (result.error) {
          return { error: result.error };
        }

        return {
          data: normaliseNYTNewsData(result.data.response.docs),
        };
      },
    }),
  }),
});

export const {
  useFetchNewsAPIQuery,
  useFetchGuardianNewsQuery,
  useFetchNYTNewsQuery,
} = newsApi;
