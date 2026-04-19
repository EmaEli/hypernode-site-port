/**
 * Strapi seed script — imports changelog entries from strapi/seed.json via REST API.
 *
 * Prerequisites:
 *   1. Strapi is running (npm run develop inside strapi/)
 *   2. PUBLIC_STRAPI_URL and PUBLIC_STRAPI_TOKEN are set in .env.local
 *
 * Usage:
 *   npm run strapi:seed
 */

import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

function loadEnv() {
  try {
    const envPath = join(__dirname, '../.env.local')
    const raw = readFileSync(envPath, 'utf-8')
    for (const line of raw.split('\n')) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      const eqIndex = trimmed.indexOf('=')
      if (eqIndex === -1) continue
      const key = trimmed.slice(0, eqIndex).trim()
      const value = trimmed.slice(eqIndex + 1).trim()
      if (!(key in process.env)) process.env[key] = value
    }
  } catch {
    // .env.local is optional — fall back to process.env
  }
}

loadEnv()

const STRAPI_URL = process.env.PUBLIC_STRAPI_URL ?? 'http://localhost:1337'
const STRAPI_TOKEN = process.env.PUBLIC_STRAPI_TOKEN

if (!STRAPI_TOKEN) {
  console.error(
    '\nPUBLIC_STRAPI_TOKEN is required.\n' +
      'Generate one in the Strapi admin panel:\n' +
      `  ${STRAPI_URL}/admin → Settings → API Tokens → Create new token (Full access)\n` +
      'Then add it to .env.local:\n' +
      '  PUBLIC_STRAPI_TOKEN=<your-token>\n',
  )
  process.exit(1)
}

// ---------------------------------------------------------------------------
// Seed
// ---------------------------------------------------------------------------

const seedPath = join(__dirname, '../strapi/seed.json')
const entries = JSON.parse(readFileSync(seedPath, 'utf-8'))

console.log(`\nSeeding ${entries.length} changelog entries into ${STRAPI_URL}...\n`)

let created = 0
let failed = 0

for (const entry of entries) {
  const response = await fetch(`${STRAPI_URL}/api/changelog-entries`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${STRAPI_TOKEN}`,
    },
    body: JSON.stringify({ data: entry }),
  })

  if (response.ok) {
    console.log(`  ✓  ${entry.date}  ${entry.title}`)
    created++
  } else {
    const body = await response.text()
    console.error(`  ✗  ${entry.title}`)
    console.error(`     ${response.status} ${response.statusText}: ${body}`)
    failed++
  }
}

console.log(`\nDone — ${created} created, ${failed} failed.\n`)

if (failed > 0) process.exit(1)
