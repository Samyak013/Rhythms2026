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
  
  // Create tables if they don't exist
  try {
    sqlite.exec(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        prn TEXT NOT NULL UNIQUE,
        dob TEXT NOT NULL,
        college TEXT NOT NULL,
        branch TEXT NOT NULL
      );
      
      CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT NOT NULL,
        entry_fee INTEGER NOT NULL,
        prize_first INTEGER,
        prize_second INTEGER,
        team_size TEXT NOT NULL,
        venue TEXT,
        date TEXT,
        time TEXT
      );
      
      CREATE TABLE IF NOT EXISTS registrations (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        event_id INTEGER NOT NULL,
        ticket_code TEXT NOT NULL UNIQUE,
        registered_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (event_id) REFERENCES events(id)
      );
    `);
    console.log("SQLite tables created/verified");
  } catch (err) {
    console.error("Error creating SQLite tables:", err);
  }
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
