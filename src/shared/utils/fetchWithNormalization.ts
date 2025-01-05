import { handleError } from "@/shared/utils/api";

/**
 * Fetches and normalizes data from the specified API.
 *
 * @param {Function} fetchFn - The fetch function provided by `fetchBaseQuery` or any custom fetch function.
 * @param {string} url - The API endpoint URL.
 * @param {Record<string, any>} params - Query parameters for the API call.
 * @param {Function} normalizeFn - Function to normalize the API response data.
 *
 * @returns {Promise<{ data: any } | { error: any }>} The normalized data or an error object.
 *
 * @example
 * const { data, error } = await fetchWithNormalization(
 *   fetchBaseQuery,
 *   "https://api.example.com/data",
 *   { query: "technology", page: 1 },
 *   normalizeData
 * );
 *
 * // Where `normalizeData` is a function to process and normalize the API response.
 */
export const fetchWithNormalization = async (
  fetchFn: any,
  url: string,
  params: Record<string, any>,
  normalizeFn: (data: any) => any
) => {
  try {
    // Fetch data from the API
    const result: any = await fetchFn({ url, params });

    // If there's an error in the response, handle it and return the error
    if (result.error) return handleError(result.error);

    // Return the normalized data
    return { data: normalizeFn(result.data) };
  } catch (error) {
    // Catch any network or unforeseen errors
    return handleError(error);
  }
};
