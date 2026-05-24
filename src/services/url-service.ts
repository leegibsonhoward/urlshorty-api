import { readUrls, writeUrls } from "../storage/storage";
import { ShortUrl } from "../types/url";

import { nanoid } from "nanoid";

/**
 * Finds a shortened URL by its original URL.
 *
 * @param originalUrl - The original URL to search for.
 * @returns The matching shortened URL, or undefined if none exists.
 */
export function findByOriginalUrl(
  originalUrl: string
): ShortUrl | undefined {
  const urls = readUrls();

  return urls.find((url) => url.originalUrl === originalUrl);
}

/**
 * Creates a new shortened URL record.
 *
 * @param originalUrl - The full URL that should be shortened.
 * @returns The newly created shortened URL object.
 */
export function createShortUrl(originalUrl: string): ShortUrl {
  const urls = readUrls();

  const shortUrl: ShortUrl = {
    id: crypto.randomUUID(),
    originalUrl,
    shortCode: nanoid(7), // Gen short URL-safe, collision-resistant codes.
    visitCount: 0,
    createdAt: new Date().toISOString()
  };

  urls.push(shortUrl);

  writeUrls(urls);

  return shortUrl;
}

/**
 * Deletes a shortened URL by its unique ID.
 *
 * @param id - The unique ID of the shortened URL to delete.
 * @returns True if a URL was deleted, otherwise false.
 */
export function deleteShortUrl(id: string): boolean {
  const urls = readUrls();

  const filteredUrls = urls.filter((url) => url.id !== id);

  if (filteredUrls.length === urls.length) {
    return false;
  }

  writeUrls(filteredUrls);

  return true;
}

/**
 * Finds a shortened URL by its short code.
 *
 * @param shortCode - The short code used in the shortened URL.
 * @returns The matching shortened URL, or undefined if none exists.
 */
export function findByShortCode(shortCode: string): ShortUrl | undefined {
  const urls = readUrls();

  return urls.find((url) => url.shortCode === shortCode);
}

/**
 * Returns all stored shortened URLs.
 *
 * @returns An array of shortened URL records.
 */
export function getAllShortUrls(): ShortUrl[] {
  return readUrls();
}

/**
 * Increments the visit count for a shortened URL.
 *
 * @param shortCode - The short code to update.
 */
export function incrementVisitCount(shortCode: string): void {
  const urls = readUrls();

  const shortUrl = urls.find((url) => url.shortCode === shortCode);

  if (!shortUrl) {
    return;
  }

  shortUrl.visitCount += 1;

  writeUrls(urls);
}