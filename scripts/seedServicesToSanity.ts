/**
 * Seed / upsert the local hardcoded services (lib/data.ts) into Sanity as
 * real `service` documents — as if an editor had created them in Studio.
 *
 * Safe to run repeatedly:
 *   - Documents use a stable id (`service.<slug>`), so re-running upserts the
 *     same docs instead of creating duplicates.
 *   - We `createIfNotExists` then `patch` ONLY the text fields we own
 *     (name, slug, descriptions, steps, display order). Editor-managed fields
 *     (image, active, before/after slider cases) are never overwritten, so an
 *     image uploaded in Studio survives a re-seed.
 *
 * Images are NOT seeded: the schema's `image` is a Sanity asset reference, and
 * the local data only has file paths / external URLs. Upload service images in
 * Studio after seeding. Until then the website keeps using the local image via
 * the per-field merge in sanity/lib/getServices.ts.
 *
 * Requires a server-only write token. NEVER expose this as NEXT_PUBLIC_*.
 *   SANITY_API_WRITE_TOKEN=<token with write access>
 *
 * Run:  npm run seed:services
 */

import { createClient } from 'next-sanity'
import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { services } from '../lib/data'

// ── Minimal .env.local loader (no extra dependency) ────────────────────────
// Loads KEY=VALUE pairs from .env.local without overwriting existing env vars.
function loadEnvLocal() {
  try {
    const file = readFileSync(resolve(process.cwd(), '.env.local'), 'utf8')
    for (const rawLine of file.split('\n')) {
      const line = rawLine.trim()
      if (!line || line.startsWith('#')) continue
      const eq = line.indexOf('=')
      if (eq === -1) continue
      const key = line.slice(0, eq).trim()
      let value = line.slice(eq + 1).trim()
      if (
        (value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))
      ) {
        value = value.slice(1, -1)
      }
      if (!(key in process.env)) process.env[key] = value
    }
  } catch {
    // No .env.local — rely on the ambient environment.
  }
}

loadEnvLocal()

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'
const token = process.env.SANITY_API_WRITE_TOKEN || ''

function fail(message: string): never {
  console.error(`\n✖ ${message}\n`)
  process.exit(1)
}

if (!projectId.trim()) {
  fail(
    'Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Set it in .env.local before seeding.',
  )
}
if (!token.trim()) {
  fail(
    'Missing SANITY_API_WRITE_TOKEN (server-only write token). ' +
      'Create one in Sanity → API → Tokens (Editor/write), then add ' +
      'SANITY_API_WRITE_TOKEN=... to .env.local. Never use a NEXT_PUBLIC_ name.',
  )
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
})

async function seed() {
  console.log(
    `Seeding ${services.length} services → project "${projectId}" dataset "${dataset}"\n`,
  )

  const missing: string[] = []
  const tx = client.transaction()

  for (const s of services) {
    const id = `service.${s.slug}`

    // displayOrder must be >= 1 in the schema; local `order` starts at 0.
    const displayOrder = s.order + 1

    const steps = s.stepsEn.map((stepEn, i) => ({
      _key: `${s.slug}-step-${i}`,
      _type: 'step',
      stepEn,
      stepAr: s.stepsAr[i] ?? '',
    }))

    // Report content the script cannot supply.
    if (s.stepsEn.length !== s.stepsAr.length) {
      missing.push(`${s.slug}: EN/AR step counts differ`)
    }
    missing.push(`${s.slug}: image must be uploaded in Studio`)

    // Create a minimal doc if absent (sets editor-owned defaults once), then
    // patch only the fields this seed owns — leaving image/active/sliderCases
    // untouched on re-runs.
    tx.createIfNotExists({
      _id: id,
      _type: 'service',
      active: true,
    })
    tx.patch(id, (p) =>
      p.set({
        nameEn: s.titleEn,
        nameAr: s.titleAr,
        slug: { _type: 'slug', current: s.slug },
        shortDescriptionEn: s.shortDescriptionEn,
        shortDescriptionAr: s.shortDescriptionAr,
        steps,
        displayOrder,
      }),
    )

    console.log(`  • ${id}  (${s.titleEn})`)
  }

  await tx.commit()

  console.log(`\n✓ Seeded/updated ${services.length} service documents.`)
  if (missing.length) {
    console.log('\nContent still required in Studio:')
    for (const m of missing) console.log(`  - ${m}`)
  }
  console.log(
    '\nNext: open /studio, upload each service image, then publish.\n',
  )
}

seed().catch((err) => {
  console.error('\n✖ Seeding failed:', err?.message || err)
  process.exit(1)
})
