import cors from "cors";
import dotenv from "dotenv";
import express, { Request, Response } from "express";

import { initializeDatabase } from "./storage/database";

import urlRoutes from "./routes/url-routes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

initializeDatabase();

/**
 * Handles the health check route.
 *
 * This route confirms that the API server is running.
 *
 * @param req - The incoming Express request object.
 * @param res - The outgoing Express response object.
 */
function healthCheck(req: Request, res: Response): void {
  res.status(200).json({
    status: "ok",
    message: "UrlShorty API is running"
  });
}

app.get("/api/health", healthCheck);

app.use(urlRoutes);

app.listen(PORT, () => {
  console.log(`UrlShorty API running on port ${PORT}`);
});