export interface Source {
  id: string | null; // Some sources might not have an ID
  name: string; // Source name is always provided
}

export interface Article {
  source: Source; // The nested source object
  author: string | null; // Author might be null
  title: string; // Title is always provided
  description: string | null; // Description might be null
  url: string; // URL to the article
  urlToImage: string | null; // Image URL might be null
  publishedAt: string; // ISO date string
  content: string | null; // Content might be null or truncated
}

export interface FetchArticlesResponse {
  status: string; // Status of the response, e.g., 'ok'
  totalResults: number; // Total number of articles
  articles: Article[]; // Array of articles
}
