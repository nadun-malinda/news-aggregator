/**
 * Configuration for external API endpoints and keys.
 *
 * This object contains URLs and API keys for various external news services.
 * The values are sourced from environment variables and default to an empty string
 * if not available.
 */
export const API_CONFIG = {
  /**
   * The base URL for the News API.
   *
   * @type {string}
   */
  NEWS_API_URL: process.env.REACT_APP_NEWSAPI_URL || "",

  /**
   * The API key for News API.
   *
   * @type {string}
   */
  NEWS_API_KEY: process.env.REACT_APP_NEWSAPI_KEY || "",

  /**
   * The base URL for The Guardian API.
   *
   * @type {string}
   */
  GUARDIAN_API_URL: process.env.REACT_APP_GUARDIAN_API_URL || "",

  /**
   * The API key for The Guardian API.
   *
   * @type {string}
   */
  GUARDIAN_API_KEY: process.env.REACT_APP_GUARDIAN_API_KEY || "",

  /**
   * The base URL for The New York Times API.
   *
   * @type {string}
   */
  NYT_API_URL: process.env.REACT_APP_NYT_API_URL || "",

  /**
   * The API key for The New York Times API.
   *
   * @type {string}
   */
  NYT_API_KEY: process.env.REACT_APP_NYT_API_KEY || "",
};
