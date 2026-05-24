import { ShortUrl } from "../types/url";

/**
 * Temporary in-memory storage for shortened URLs.
 *
 * This will reset every time the server restarts.
 * Later, we will replace this with JSON file storage.
 */
const urls: ShortUrl[] = [];

/**
 * Creates a new shortened URL record.
 *
 * @param originalUrl - The full URL that should be shortened.
 * @returns The newly created shortened URL object.
 */
export function createShortUrl(originalUrl: string): ShortUrl {
  const shortUrl: ShortUrl = {
    id: crypto.randomUUID(),
    originalUrl,
    shortCode: Math.random().toString(36).slice(2, 8),
    visitCount: 0,
    createdAt: new Date().toISOString()
  };

  urls.push(shortUrl);

  return shortUrl;
}

/**
 * Finds a shortened URL by its short code.
 *
 * @param shortCode - The short code used in the shortened URL.
 * @returns The matching shortened URL, or undefined if none exists.
 */
export function findByShortCode(shortCode: string): ShortUrl | undefined {
  return urls.find((url) => url.shortCode === shortCode);
}

/**
 * Returns all shortened URLs currently stored in memory.
 *
 * @returns An array of shortened URL records.
 */
export function getAllShortUrls(): ShortUrl[] {
  return urls;
}