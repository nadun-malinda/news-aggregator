import { CategoryEnum } from "@/types/category";

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
    id: CategoryEnum["politics"],
    name: "Politics",
  },
  {
    id: CategoryEnum["music"],
    name: "Music",
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
