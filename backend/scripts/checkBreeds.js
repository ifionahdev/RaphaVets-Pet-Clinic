import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config({ path: ".env.production" });
dotenv.config();

const dbUrl = process.env.DATABASE_URL ?? process.env.MYSQL_URL ?? process.env.DB_URL;
if (!dbUrl) {
  console.error("DATABASE_URL (or MYSQL_URL/DB_URL) is missing in backend/.env");
  process.exit(1);
}

const useSsl = ["true", "1", "yes"].includes(String(process.env.DB_SSL ?? "true").toLowerCase());
const conn = await mysql.createConnection({
  uri: dbUrl,
  ssl: useSsl ? { rejectUnauthorized: false } : undefined,
});

try {
  const [rows] = await conn.query("SELECT species, COUNT(*) AS total FROM breed_tbl GROUP BY species ORDER BY species");
  console.table(rows);
} finally {
  await conn.end();
}
