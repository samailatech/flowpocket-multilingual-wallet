import { Pool } from 'pg';

let pool;
let schemaReadyPromise;

export function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not configured.');
    }

    const isLocalDatabase =
      process.env.DATABASE_URL.includes('localhost') ||
      process.env.DATABASE_URL.includes('127.0.0.1');

    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: isLocalDatabase ? undefined : { rejectUnauthorized: false },
    });
  }

  return pool;
}

async function ensureUsersTable(client) {
  await client.query('CREATE EXTENSION IF NOT EXISTS pgcrypto');

  await client.query(`
    CREATE TABLE IF NOT EXISTS users (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      bvn TEXT,
      nin TEXT,
      wallet_balance NUMERIC(14, 2) NOT NULL DEFAULT 0,
      pin_hash TEXT,
      two_factor_enabled BOOLEAN NOT NULL DEFAULT FALSE,
      verification_level TEXT NOT NULL DEFAULT 'unverified',
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

  await client.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS pin_hash TEXT");
  await client.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS verification_level TEXT NOT NULL DEFAULT 'unverified'");
  await client.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS two_factor_enabled BOOLEAN NOT NULL DEFAULT FALSE");
  await client.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS wallet_balance NUMERIC(14, 2) NOT NULL DEFAULT 0");
  await client.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()");
  await client.query("ALTER TABLE users ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()");
}

export async function ensureCoreSchema() {
  if (!schemaReadyPromise) {
    schemaReadyPromise = (async () => {
      const client = await getPool().connect();

      try {
        await ensureUsersTable(client);
      } finally {
        client.release();
      }
    })().catch((error) => {
      schemaReadyPromise = undefined;
      throw error;
    });
  }

  return schemaReadyPromise;
}

export async function query(text, params = []) {
  await ensureCoreSchema();
  return getPool().query(text, params);
}

export async function withTransaction(callback) {
  const client = await getPool().connect();

  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}
console.error('Register error:', error)