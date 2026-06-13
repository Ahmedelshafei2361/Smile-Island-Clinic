import { client } from './client'
import { urlForImage } from './image'
import { isSanityConfigured } from '../env'
import type { ResolvedService } from './getServices'

/**
 * Resolved Popular Treatments services in the editor's chosen order.
 *
 * Return contract:
 *   - `null`  → Sanity not configured / unavailable / no selection document.
 *               Caller should use the local static fallback.
 *   - `[]`    → A selection exists but fewer than 3 valid active services.
 *               Caller should HIDE the section (do not show local fallback).
 *   - `[...]` → 3–6 valid services to render.
 */
const POPULAR_PROJECTION = `{
  "services": selectedServices[]->{
    "slug": slug.current,
    nameEn,
    nameAr,
    shortDescriptionEn,
    shortDescriptionAr,
    image,
    active,
    displayOrder
  }
}`

interface RawPopularService {
  slug?: string
  nameEn?: string
  nameAr?: string
  shortDescriptionEn?: string
  shortDescriptionAr?: string
  image?: { asset?: { _ref?: string } }
  active?: boolean
  displayOrder?: number
}

function mapPopular(raw: RawPopularService | null): ResolvedService | null {
  if (!raw) return null
  if (raw.active === false) return null
  if (!raw.slug || !raw.nameEn || !raw.nameAr) return null
  if (!raw.shortDescriptionEn || !raw.shortDescriptionAr) return null
  if (!raw.image?.asset) return null

  let image: string
  try {
    image = urlForImage(raw.image).width(1200).fit('max').url()
  } catch {
    return null
  }

  return {
    slug: raw.slug,
    titleEn: raw.nameEn,
    titleAr: raw.nameAr,
    shortDescriptionEn: raw.shortDescriptionEn,
    shortDescriptionAr: raw.shortDescriptionAr,
    stepsEn: [],
    stepsAr: [],
    image,
    sliderCases: [],
    order: raw.displayOrder ?? 999,
  }
}

export async function getPopularTreatments(): Promise<ResolvedService[] | null> {
  if (!isSanityConfigured) return null

  try {
    const doc = await client.fetch<{ services?: RawPopularService[] } | null>(
      `*[_type == "popularTreatments" && _id == "popularTreatments"][0] ${POPULAR_PROJECTION}`,
      {},
      { next: { revalidate: 30 } },
    )

    // No selection document at all → fall back to local content.
    if (!doc || !Array.isArray(doc.services)) return null

    const valid = doc.services
      .map(mapPopular)
      .filter((s): s is ResolvedService => s !== null)

    // Selection exists but is insufficient → hide the section.
    if (valid.length < 3) return []

    return valid.slice(0, 6)
  } catch {
    return null
  }
}
