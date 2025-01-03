export type CategoryId = (typeof CATEGORIES)[number]["id"];

export const enum CATEGORY_ID {
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
    id: CATEGORY_ID["all"],
    name: "All",
  },
  {
    id: CATEGORY_ID["business"],
    name: "Business",
  },
  {
    id: CATEGORY_ID["entertainment"],
    name: "Entertainment",
  },
  {
    id: CATEGORY_ID["general"],
    name: "General",
  },
  {
    id: CATEGORY_ID["health"],
    name: "Health",
  },
  {
    id: CATEGORY_ID["science"],
    name: "Science",
  },
  {
    id: CATEGORY_ID["sports"],
    name: "Sports",
  },
  {
    id: CATEGORY_ID["technology"],
    name: "Technology",
  },
] as const;
