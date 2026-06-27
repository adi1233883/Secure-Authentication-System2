const mysql = require("mysql2/promise");
const env = require("./env");

const pool = mysql.createPool({
  host: env.DB_HOST,
  port: Number(env.DB_PORT),
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,

  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  dateStrings: false,

  ssl: {
    minVersion: "TLSv1.2",
    rejectUnauthorized: false,
  },
});

async function testConnection() {
  try {
    const conn = await pool.getConnection();
    await conn.ping();
    conn.release();

    console.log(
      `[db] Connected to TiDB "${env.DB_NAME}" at ${env.DB_HOST}:${env.DB_PORT}`
    );
  } catch (err) {
    console.error("[db] Failed to connect to TiDB:", err);
    process.exit(1);
  }
}

module.exports = { pool, testConnection };