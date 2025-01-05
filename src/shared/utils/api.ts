/**
 * Handles API errors and logs them.
 * @param error - The error object returned by the API call.
 * @returns An object containing the error.
 */

export const handleError = (error: any) => {
  console.error("API Error:", error);
  return { error };
};
