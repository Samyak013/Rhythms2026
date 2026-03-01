import "dotenv/config";
import mysql from "mysql2/promise";

async function initDb() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "rhythms2026",
  });

  // Create tables if they don't exist
  await connection.execute(`
    CREATE TABLE IF NOT EXISTS users (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      prn VARCHAR(100) NOT NULL UNIQUE,
      dob VARCHAR(8) NOT NULL,
      college VARCHAR(255) NOT NULL,
      branch VARCHAR(255) NOT NULL
    );
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS events (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      category VARCHAR(100) NOT NULL,
      description TEXT NOT NULL,
      entry_fee INT NOT NULL,
      prize_first INT,
      prize_second INT,
      team_size VARCHAR(50) NOT NULL,
      venue VARCHAR(255),
      date VARCHAR(50),
      time VARCHAR(100)
    );
  `);

  await connection.execute(`
    CREATE TABLE IF NOT EXISTS registrations (
      id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
      user_id INT NOT NULL,
      event_id INT NOT NULL,
      ticket_code VARCHAR(100) NOT NULL UNIQUE,
      registered_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (event_id) REFERENCES events(id)
    );
  `);

  await connection.end();
  console.log("MySQL database initialized successfully!");
}

initDb().catch(console.error);
