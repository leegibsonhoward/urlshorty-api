/**
 * Builds a complete shortened URL string.
 *
 * Uses BASE_URL from the environment when available.
 *
 * @param shortCode - The short code for the URL.
 * @returns A full shortened URL.
 */
export function buildShortUrl(shortCode: string): string {
  const baseUrl = process.env.BASE_URL || "http://localhost:3000";

  return `${baseUrl}/${shortCode}`;
}