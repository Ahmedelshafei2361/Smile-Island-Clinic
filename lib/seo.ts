import type { Locale } from '@/lib/locale'

/**
 * Absolute site origin used for canonical URLs, Open Graph, robots, and sitemap.
 * Set NEXT_PUBLIC_SITE_URL in production (Netlify). Falls back to localhost in
 * development so nothing breaks when the env var is missing.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
).replace(/\/+$/, '')

export const SITE_NAME = 'Smile Island Dental Clinic'

/** Local Open Graph image (no external URLs, no generated assets). */
export const OG_IMAGE = '/images/hero/hero-image.png'

/** Open Graph locale code for a given site locale. */
export function ogLocale(loc: Locale): string {
  return loc === 'ar' ? 'ar_EG' : 'en_US'
}
