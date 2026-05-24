/**
 * Builds a complete shortened URL string.
 *
 * @param shortCode - The short code for the URL.
 * @returns A full shortened URL.
 */
export function buildShortUrl(shortCode: string): string {
  return `http://localhost:3000/${shortCode}`;
}