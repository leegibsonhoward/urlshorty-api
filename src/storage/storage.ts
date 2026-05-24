import fs from "node:fs";
import path from "node:path";

import { ShortUrl } from "../types/url";

/**
 * Absolute path to the JSON storage file.
 */
const FILE_PATH = path.join(__dirname, "../data/urls.json");

/**
 * Reads all stored URLs from the JSON file.
 *
 * @returns An array of stored shortened URLs.
 */
export function readUrls(): ShortUrl[] {
  const fileContent = fs.readFileSync(FILE_PATH, "utf-8");

  return JSON.parse(fileContent) as ShortUrl[];
}

/**
 * Writes all URLs to the JSON storage file.
 *
 * @param urls - The complete array of shortened URLs to save.
 */
export function writeUrls(urls: ShortUrl[]): void {
  fs.writeFileSync(FILE_PATH, JSON.stringify(urls, null, 2));
}