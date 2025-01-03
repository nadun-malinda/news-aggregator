export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const enum CategoryEnum {
  "all" = "all",
  "business" = "business",
  "entertainment" = "entertainment",
  "general" = "general",
  "health" = "health",
  "science" = "science",
  "sports" = "sports",
  "technology" = "technology",
}

export const CATEGORIES = [
  {
    id: CategoryEnum["all"],
    name: "All",
  },
  {
    id: CategoryEnum["business"],
    name: "Business",
  },
  {
    id: CategoryEnum["entertainment"],
    name: "Entertainment",
  },
  {
    id: CategoryEnum["general"],
    name: "General",
  },
  {
    id: CategoryEnum["health"],
    name: "Health",
  },
  {
    id: CategoryEnum["science"],
    name: "Science",
  },
  {
    id: CategoryEnum["sports"],
    name: "Sports",
  },
  {
    id: CategoryEnum["technology"],
    name: "Technology",
  },
] as const;
