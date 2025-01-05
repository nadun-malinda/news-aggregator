import { CATEGORIES } from "@/shared/consts/categories";

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
