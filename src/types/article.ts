import { CategoryId } from "@/shared/consts/categories";
import { Source, SourceId } from "@/shared/consts/sources";

/**
 * A normalized representation of a news article.
 */
export interface Article {
  /** Unique identifier for the article. */
  id: string;
  /** Source of the article, e.g., BBC, Guardian, NYT. */
  source: Source;
  /** Title of the article. */
  title: string;
  /** Content or excerpt of the article (nullable). */
  content: string | null;
  /** URL to the article's image (nullable). */
  image: string | null;
  /** Author of the article (nullable). */
  author: string | null;
  /** Associated category of the article (nullable). */
  category: string | null;
  /** Publication date of the article (nullable). */
  publishedAt: string | null;
  /** URL to the full article (nullable). */
  url: string | null;
}

export interface FetchNewsQueryParams {
  to?: string;
  from?: string;
  query: string;
  sources: SourceId[];
  category?: CategoryId[];
}
