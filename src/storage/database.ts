import Database from "better-sqlite3";
import path from "node:path";

/**
 * Absolute path to the SQLite database file.
 */
const DATABASE_PATH = path.join(process.cwd(), "data", "urlshorty.db");

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