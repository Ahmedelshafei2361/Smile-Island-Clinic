// Sanity environment config.
// IMPORTANT: never throw here — the site must build even with no .env.local set.
// When projectId is missing, `isSanityConfigured` is false and the app falls
// back to local static content.

export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-10-01'

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''

/** True only when a real Sanity project id has been provided. */
export const isSanityConfigured = projectId.trim().length > 0
