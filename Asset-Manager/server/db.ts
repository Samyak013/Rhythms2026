import * as schema from "@shared/schema";
import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import pg from "pg";
import { drizzle as pgDrizzle } from "drizzle-orm/node-postgres";

const { Pool } = pg;

let db: any;
let pool: any;

if (process.env.NODE_ENV === "production" && process.env.DATABASE_URL) {
  // Production: Use PostgreSQL
  pool = new Pool({ connectionString: process.env.DATABASE_URL });
  db = pgDrizzle(pool, { schema });
} else {
  // Development: Use SQLite
  const sqlite = new Database("dev.db");
  sqlite.pragma("journal_mode = WAL");
  db = drizzle(sqlite, { schema });
}

export { db, pool };
