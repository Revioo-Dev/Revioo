#!/usr/bin/env node
/**
 * Applies the Revioo database migration to the connected Supabase project.
 * Uses the service role key to call available SQL execution endpoints.
 */

import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
  console.error("❌ Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const projectRef = SUPABASE_URL.replace("https://", "").split(".")[0];
const sqlPath = join(__dirname, "../supabase/migrations/001_initial.sql");
const sql = await readFile(sqlPath, "utf8");

console.log(`🔗 Project: ${projectRef}`);
console.log(`📄 Migration: ${sql.length} bytes\n`);

// Try Supabase Management API (requires PAT — this may return 401 with service role key)
async function tryManagementApi() {
  const res = await fetch(
    `https://api.supabase.com/v1/projects/${projectRef}/database/query`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query: sql }),
    }
  );
  return { status: res.status, body: await res.text() };
}

// Try pg-meta (available on some Supabase plans)
async function tryPgMeta() {
  const res = await fetch(`${SUPABASE_URL}/pg/query`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query: sql }),
  });
  return { status: res.status, body: await res.text() };
}

// Try exec_sql RPC (if manually created in the project)
async function tryExecSqlRpc() {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/exec_sql`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${SERVICE_ROLE_KEY}`,
      apikey: SERVICE_ROLE_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sql_query: sql }),
  });
  return { status: res.status, body: await res.text() };
}

let applied = false;

console.log("Trying Management API…");
const r1 = await tryManagementApi();
console.log(`  → ${r1.status}: ${r1.body.slice(0, 120)}`);
if (r1.status === 200 || r1.status === 201) { applied = true; }

if (!applied) {
  console.log("Trying pg-meta…");
  const r2 = await tryPgMeta();
  console.log(`  → ${r2.status}: ${r2.body.slice(0, 120)}`);
  if (r2.status === 200 || r2.status === 201) { applied = true; }
}

if (!applied) {
  console.log("Trying exec_sql RPC…");
  const r3 = await tryExecSqlRpc();
  console.log(`  → ${r3.status}: ${r3.body.slice(0, 120)}`);
  if (r3.status === 200 || r3.status === 201) { applied = true; }
}

if (applied) {
  console.log("\n✅ Migration applied successfully!");
} else {
  console.log("\n⚠️  Automatic migration not available with service role key.");
  console.log("   Apply the migration manually in the Supabase SQL Editor:");
  console.log(`   https://supabase.com/dashboard/project/${projectRef}/sql/new`);
  console.log("\n   The SQL is in: supabase/migrations/001_initial.sql");
  console.log("   Copy its contents and click Run.\n");
}
