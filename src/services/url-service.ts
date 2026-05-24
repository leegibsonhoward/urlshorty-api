import { nanoid } from "nanoid";

import { db } from "../storage/database";
import { ShortUrl } from "../types/url";

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
    shortCode: nanoid(7),
    visitCount: 0,
    createdAt: new Date().toISOString()
  };

  const statement = db.prepare(`
    INSERT INTO urls (
      id,
      originalUrl,
      shortCode,
      visitCount,
      createdAt
    )
    VALUES (?, ?, ?, ?, ?)
  `);

  statement.run(
    shortUrl.id,
    shortUrl.originalUrl,
    shortUrl.shortCode,
    shortUrl.visitCount,
    shortUrl.createdAt
  );

  return shortUrl;
}

/**
 * Finds a shortened URL by its original URL.
 *
 * @param originalUrl - The original URL to search for.
 * @returns The matching shortened URL, or undefined if none exists.
 */
export function findByOriginalUrl(
  originalUrl: string
): ShortUrl | undefined {
  const statement = db.prepare(`
    SELECT * FROM urls
    WHERE originalUrl = ?
  `);

  return statement.get(originalUrl) as ShortUrl | undefined;
}

/**
 * Finds a shortened URL by its short code.
 *
 * @param shortCode - The short code used in the shortened URL.
 * @returns The matching shortened URL, or undefined if none exists.
 */
export function findByShortCode(
  shortCode: string
): ShortUrl | undefined {
  const statement = db.prepare(`
    SELECT * FROM urls
    WHERE shortCode = ?
  `);

  return statement.get(shortCode) as ShortUrl | undefined;
}

/**
 * Returns all stored shortened URLs.
 *
 * @returns An array of shortened URL records.
 */
export function getAllShortUrls(): ShortUrl[] {
  const statement = db.prepare(`
    SELECT * FROM urls
    ORDER BY createdAt DESC
  `);

  return statement.all() as ShortUrl[];
}

/**
 * Deletes a shortened URL by its unique ID.
 *
 * @param id - The unique ID of the shortened URL to delete.
 * @returns True if a URL was deleted, otherwise false.
 */
export function deleteShortUrl(id: string): boolean {
  const statement = db.prepare(`
    DELETE FROM urls
    WHERE id = ?
  `);

  const result = statement.run(id);

  return result.changes > 0;
}

/**
 * Increments the visit count for a shortened URL.
 *
 * @param shortCode - The short code to update.
 */
export function incrementVisitCount(shortCode: string): void {
  const statement = db.prepare(`
    UPDATE urls
    SET visitCount = visitCount + 1
    WHERE shortCode = ?
  `);

  statement.run(shortCode);
}