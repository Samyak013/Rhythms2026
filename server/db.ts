import * as schema from "@shared/schema";
import { drizzle as drizzleMysql } from "drizzle-orm/mysql2";
import { drizzle as drizzleSqlite } from "drizzle-orm/better-sqlite3";
import mysql from "mysql2/promise";
import Database from "better-sqlite3";

// Use SQLite for development, MySQL for production
const isDevelopment = process.env.NODE_ENV === "development";

let db: any;
let poolConnection: any;

if (isDevelopment) {
  // SQLite for development
  const sqlite = new Database("dev.db");
  db = drizzleSqlite(sqlite, { schema });
  poolConnection = sqlite;
} else {
  // MySQL for production
  poolConnection = mysql.createPool({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "rhythms2026",
    waitForConnections: true,
    connectionLimit: 10,
  });
  db = drizzleMysql(poolConnection, { schema, mode: "default" });
}

export { db, poolConnection };
