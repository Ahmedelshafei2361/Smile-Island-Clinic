import { client } from './client'
import { isSanityConfigured } from '../env'

/**
 * Resolved Hero content the HeroSection consumes. Every field is optional —
 * the component fills gaps from local static defaults when a field is missing.
 *
 * titleAccent  → the colored/accent span (EN: first, AR: first-read/right-side)
 * titleNormal  → the dark/normal span   (EN: second, AR: second-read/left-side)
 */
export interface HeroContent {
  titleAccent?: string
  titleNormal?: string
  subtitle?: string
  reviewsValue?: string
}

const HERO_QUERY = `*[_type == "homePage" && _id == "homePageHero"][0]{
  heroTitleAccentEn,
  heroTitleNormalEn,
  heroTitleNormalAr,
  heroTitleAccentAr,
  heroSubtitleEn,
  heroSubtitleAr,
  reviewCounterEn,
  reviewCounterAr
}`

/**
 * Fetch homepage Hero content for a locale. Returns null when Sanity is not
 * configured, the fetch fails, or no document exists — callers fall back to
 * local content.
 */
export async function getHeroContent(
  locale: string,
): Promise<HeroContent | null> {
  if (!isSanityConfigured) return null

  try {
    const doc = await client.fetch(HERO_QUERY, {}, { next: { revalidate: 30 } })
    if (!doc) return null

    const isAr = locale === 'ar'

    // Arabic: "normal first part" (heroTitleNormalAr) goes into the accent span
    // so it appears on the right (reads first in RTL), preserving correct reading order.
    const titleAccent = isAr ? doc.heroTitleNormalAr : doc.heroTitleAccentEn
    const titleNormal = isAr ? doc.heroTitleAccentAr : doc.heroTitleNormalEn
    const subtitle = isAr ? doc.heroSubtitleAr : doc.heroSubtitleEn
    const reviewsValue = isAr ? doc.reviewCounterAr : doc.reviewCounterEn

    const content: HeroContent = {}
    if (titleAccent) content.titleAccent = titleAccent
    if (titleNormal) content.titleNormal = titleNormal
    if (subtitle) content.subtitle = subtitle
    if (reviewsValue) content.reviewsValue = reviewsValue

    return Object.keys(content).length > 0 ? content : null
  } catch {
    // Network/config error → silent fallback to local content.
    return null
  }
}
