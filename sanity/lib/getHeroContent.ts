import { client } from './client'
import { urlForImage } from './image'
import { isSanityConfigured } from '../env'

/**
 * Resolved Hero content the HeroSection consumes. Every field is optional —
 * the component merges this over its local static defaults, so a missing
 * Sanity field (or no Sanity at all) never blanks the Hero.
 */
export interface HeroContent {
  titleAccent?: string
  titleRegular?: string
  subtitle?: string
  primaryCtaLabel?: string
  secondaryCtaLabel?: string
  primaryCtaMessage?: string
  heroImageUrl?: string
  stats?: {
    healthyLabel?: string
    healthySubtext?: string
    satisfactionValue?: string
    satisfactionLabel?: string
    ratingValue?: string
    reviewsValue?: string
    reviewsLabel?: string
  }
}

const HERO_QUERY = `*[_type == "homePage" && locale == $locale][0]{
  heroTitleLine1,
  heroTitleAccent1,
  heroTitleLine2,
  heroTitleAccent2,
  heroSubtitle,
  primaryCtaLabel,
  secondaryCtaLabel,
  primaryCtaMessage,
  heroImage,
  stats
}`

function clean<T extends Record<string, unknown>>(obj: T): Partial<T> {
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(obj)) {
    if (v !== undefined && v !== null && v !== '') out[k] = v
  }
  return out as Partial<T>
}

/**
 * Fetch homepage Hero content for a locale. Returns null when Sanity is not
 * configured, the fetch fails, or no document exists — callers fall back to
 * local content.
 */
export async function getHeroContent(locale: string): Promise<HeroContent | null> {
  if (!isSanityConfigured) return null

  try {
    const doc = await client.fetch(
      HERO_QUERY,
      { locale: locale === 'ar' ? 'ar' : 'en' },
      { next: { revalidate: 60 } }
    )
    if (!doc) return null

    const stats = doc.stats
      ? clean({
          healthyLabel: doc.stats.healthySmileLabel,
          healthySubtext: doc.stats.healthySmileSubtext,
          satisfactionValue: doc.stats.satisfactionValue,
          satisfactionLabel: doc.stats.satisfactionLabel,
          ratingValue: doc.stats.ratingValue,
          reviewsValue: doc.stats.reviewsValue,
          reviewsLabel: doc.stats.reviewsLabel,
        })
      : undefined

    const content: HeroContent = clean({
      titleAccent: doc.heroTitleAccent1,
      titleRegular: doc.heroTitleLine1,
      subtitle: doc.heroSubtitle,
      primaryCtaLabel: doc.primaryCtaLabel,
      secondaryCtaLabel: doc.secondaryCtaLabel,
      primaryCtaMessage: doc.primaryCtaMessage,
      heroImageUrl: doc.heroImage
        ? urlForImage(doc.heroImage).width(1400).fit('max').url()
        : undefined,
    })

    if (stats && Object.keys(stats).length > 0) content.stats = stats
    return content
  } catch {
    // Network/config error → silent fallback to local content.
    return null
  }
}
