import { SOURCES } from "@/shared/consts/sources";

export const enum SourcesEnum {
  "all" = "all",
  "nyt" = "nyt",
  "bbc-news" = "bbc-news",
  "guardian" = "guardian",
}

export type Source = (typeof SOURCES)[number];
export type SourceName = Source["name"];
export type SourceId = Source["id"];
