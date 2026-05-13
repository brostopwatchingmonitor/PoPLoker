import { neon } from '@neondatabase/serverless';
import { Pool } from '@neondatabase/serverless';

// For Neon Serverless Postgres with Vercel Edge compatibility
// Uses pool connection for better performance in serverless environment

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error('DATABASE_URL is not defined. Please set it in your environment variables.');
}

// Create neon client - works in both edge and node environments
export const sql = neon(connectionString);

// Alternative: Pool-based connection for more complex queries
// Use this when you need transaction support or many queries in one request
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    pool = new Pool({
      connectionString,
      max: 1, // Neon handles connection pooling automatically
      idleTimeoutMillis: 1000,
      connectionTimeoutMillis: 10000,
    });
  }
  return pool;
}

// Query helper with automatic retry for serverless environments
export async function query<T>(text: string, params?: unknown[]): Promise<T[]> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    const result = await client.query(text, params);
    return result.rows as T[];
  } finally {
    client.release();
  }
}

// Single query without pool (simpler for edge functions)
export async function querySingle<T>(text: string, params?: unknown[]): Promise<T | null> {
  const result = await sql`${text}`;
  return result[0] as T | null;
}

// Transaction helper
export async function transaction<T>(callback: (sql: typeof import('@neondatabase/serverless').default) => Promise<T>): Promise<T> {
  const pool = getPool();
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const result = await callback(sql);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}

export default sql;