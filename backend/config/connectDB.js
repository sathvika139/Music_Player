import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();

const { Pool } = pkg;

// Create pool
export const db = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Neon
  },
});

// Test connection
(async () => {
  try {
    const client = await db.connect();
    console.log("PostgreSQL connected ✅");
    client.release();
  } catch (error) {
    console.error("PostgreSQL connection failed ❌", error.message);
    process.exit(1);
  }
})();
