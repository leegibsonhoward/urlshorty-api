import { Router, Request, Response } from "express";

import { buildShortUrl } from "../utils/build-short-url";

import {
  createShortUrl,
  deleteShortUrl,
  findByOriginalUrl,
  findByShortCode,
  getAllShortUrls,
  incrementVisitCount
} from "../services/url-service";

import { isValidUrl } from "../utils/validate-url";

/**
 * Defines the expected route parameters for short URL routes.
 *
 * Express route params can sometimes be inferred as
 * string | string[] by TypeScript.
 *
 * This explicit type ensures that shortCode
 * is always treated as a string.
 */
type ShortCodeParams = {
  shortCode: string;
};

/**
 * Defines the expected route parameters for URL ID routes.
 */
type UrlIdParams = {
  id: string;
};

const router = Router();

/**
 * Creates a new shortened URL.
 *
 * Expects a JSON body containing:
 * {
 *   "originalUrl": "https://example.com"
 * }
 */
router.post("/api/urls", (req: Request, res: Response) => {
  const { originalUrl } = req.body;

  if (!originalUrl) {
    res.status(400).json({
      error: "originalUrl is required"
    });

    return;
  }

  if (!isValidUrl(originalUrl)) {
    res.status(400).json({
      error: "Invalid URL format"
    });

    return;
  }

  const existingUrl = findByOriginalUrl(originalUrl);

  if (existingUrl) {
    res.status(200).json({
      ...existingUrl,
      shortUrl: buildShortUrl(existingUrl.shortCode)
    });

    return;
}
  
  const shortUrl = createShortUrl(originalUrl);

  res.status(201).json({
    ...shortUrl,
    shortUrl: buildShortUrl(shortUrl.shortCode)
  });
  
});

/**
 * Returns all shortened URLs.
 */
router.get("/api/urls", (req: Request, res: Response) => {
  const urls = getAllShortUrls();

  res.status(200).json(
  urls.map((url) => ({
    ...url,
    shortUrl: buildShortUrl(url.shortCode)
  }))
);
});

/**
 * Deletes a shortened URL by ID.
 */
router.delete("/api/urls/:id", (req: Request<UrlIdParams>, res: Response) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).json({
      error: "URL ID is required"
    });

    return;
  }

  const wasDeleted = deleteShortUrl(id);

  if (!wasDeleted) {
    res.status(404).json({
      error: "Short URL not found"
    });

    return;
  }

  res.status(204).send();
});

/**
 * Redirects a shortened URL to its original destination.
 */
router.get("/:shortCode", (req: Request<ShortCodeParams>, res: Response) => {

  // const { shortCode } = req.params;
  const shortCode = req.params.shortCode;

  const shortUrl = findByShortCode(shortCode);

  if (!shortUrl) {
    res.status(404).json({
      error: "Short URL not found"
    });

    return;
  }

    incrementVisitCount(shortCode);

  res.redirect(shortUrl.originalUrl);
});

export default router;