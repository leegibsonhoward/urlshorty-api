import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

/**
 * Absolute path to the data directory.
 */
const DATA_DIR = path.join(process.cwd(), "data");

/**
 * 
/**
 * Absolute path to the SQLite database file.
 */
const DATABASE_PATH = path.join(DATA_DIR, "urlshorty.db");

/**
 * Ensures the data directory exists before opening SQLite.
 */
function ensureDataDirectory(): void {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

ensureDataDirectory();

/**
 * Shared SQLite database connection.
 */
export const db = new Database(DATABASE_PATH);

/**
 * Creates required database tables if they do not already exist.
 */
export function initializeDatabase(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS urls (
      id TEXT PRIMARY KEY,
      originalUrl TEXT NOT NULL UNIQUE,
      shortCode TEXT NOT NULL UNIQUE,
      visitCount INTEGER NOT NULL DEFAULT 0,
      createdAt TEXT NOT NULL
    );
  `);
}