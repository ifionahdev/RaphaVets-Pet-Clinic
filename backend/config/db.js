import mysql from "mysql2/promise";

// Create a promise-based pool
const db = mysql.createPool({
  host: process.env.MYSQLHOST,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  port: process.env.MYSQLPORT,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test connection
try {
  const connection = await db.getConnection();
  console.log("✅ Connected to Railway MySQL database!");
  connection.release();
} catch (err) {
  console.error("❌ Database connection failed:", err.message);
}

export default db;