import { Router, Request, Response } from "express";

import {
  createShortUrl,
  findByShortCode,
  getAllShortUrls,
  incrementVisitCount
} from "../services/url-service";

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

  const shortUrl = createShortUrl(originalUrl);

  res.status(201).json(shortUrl);
});

/**
 * Returns all shortened URLs.
 */
router.get("/api/urls", (req: Request, res: Response) => {
  const urls = getAllShortUrls();

  res.status(200).json(urls);
});

/**
 * Redirects a shortened URL to its original destination.
 */
router.get("/:shortCode", (req: Request, res: Response) => {
  const { shortCode } = req.params;

  const shortUrl = findByShortCode(shortCode as string);

  if (!shortUrl) {
    res.status(404).json({
      error: "Short URL not found"
    });

    return;
  }

    incrementVisitCount(shortCode as string);

  res.redirect(shortUrl.originalUrl);
});

export default router;