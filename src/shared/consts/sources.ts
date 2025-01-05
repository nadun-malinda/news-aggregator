import { SourcesEnum } from "@/types/source";

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
