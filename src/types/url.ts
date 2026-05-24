/**
 * Represents a shortened URL stored by the API.
 */
export interface ShortUrl {
  id: string;
  originalUrl: string;
  shortCode: string;
  visitCount: number;
  createdAt: string;
}