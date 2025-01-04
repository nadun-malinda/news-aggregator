export const enum SourcesEnum {
  "all" = "all",
  "nyt" = "nyt",
  "bbc-news" = "bbc-news",
  "guardian" = "guardian",
}

export const SOURCES = [
  {
    id: SourcesEnum["nyt"],
    name: "The New York Times",
  },
  {
    id: SourcesEnum["bbc-news"],
    name: "BBC News",
  },
  {
    id: SourcesEnum["guardian"],
    name: "The Guardian",
  },
] as const;

export type Source = (typeof SOURCES)[number];
export type SourceName = Source["name"];
export type SourceId = Source["id"];
