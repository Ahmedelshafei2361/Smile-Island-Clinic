import { client } from './client'
import { urlForImage } from './image'
import { isSanityConfigured } from '../env'
import { services as localServices } from '@/lib/data'
import type { ResolvedService } from './getServices'

/**
 * Resolved Popular Treatments services in the editor's chosen order.
 *
 * `items` contract:
 *   - `null`  → Sanity not configured / unavailable / no selection document.
 *               Caller should use the local static fallback.
 *   - `[]`    → A selection exists but fewer than 3 valid active services.
 *               Caller should HIDE the section (do not show local fallback).
 *   - `[...]` → 3–6 valid services to render.
 *
 * `showSection` contract (visibility toggle):
 *   - Defaults to `true` (visible) when missing, null, or on any failure.
 *   - Only `false` when the editor explicitly turns the section off.
 */
const POPULAR_PROJECTION = `{
  showSection,
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

/**
 * Resolve a selected service reference to a render-ready item. CMS values win
 * per field; the local service (matched by slug) fills any gaps — most
 * importantly the image, since seeded services often have no image uploaded
 * yet. A reference is dropped only when it is unresolved, explicitly inactive,
 * or an essential field is missing from BOTH CMS and local data.
 */
function mapPopular(raw: RawPopularService | null): ResolvedService | null {
  if (!raw) return null
  if (raw.active === false) return null // explicitly hidden in CMS
  if (!raw.slug) return null

  const local = localServices.find((s) => s.slug === raw.slug)

  const titleEn = raw.nameEn || local?.titleEn
  const titleAr = raw.nameAr || local?.titleAr
  const shortDescriptionEn = raw.shortDescriptionEn || local?.shortDescriptionEn
  const shortDescriptionAr = raw.shortDescriptionAr || local?.shortDescriptionAr

  let image: string | undefined
  if (raw.image?.asset) {
    try {
      image = urlForImage(raw.image).width(1200).fit('max').url()
    } catch {
      image = undefined
    }
  }
  if (!image) image = local?.thumbnailImage

  if (!titleEn || !titleAr || !shortDescriptionEn || !shortDescriptionAr) return null
  if (!image) return null

  return {
    slug: raw.slug,
    titleEn,
    titleAr,
    shortDescriptionEn,
    shortDescriptionAr,
    stepsEn: [],
    stepsAr: [],
    image,
    sliderCases: [],
    order: raw.displayOrder ?? local?.order ?? 999,
  }
}

export interface PopularTreatmentsResult {
  /** See `items` contract above. */
  items: ResolvedService[] | null
  /** Visibility toggle. Visible by default; only `false` hides the section. */
  showSection: boolean
}

export async function getPopularTreatments(): Promise<PopularTreatmentsResult> {
  if (!isSanityConfigured) return { items: null, showSection: true }

  try {
    const doc = await client.fetch<
      { showSection?: boolean; services?: RawPopularService[] } | null
    >(
      `*[_type == "popularTreatments" && _id == "popularTreatments"][0] ${POPULAR_PROJECTION}`,
      {},
      { next: { revalidate: 30 } },
    )

    // Visible unless the editor explicitly set the toggle to false.
    const showSection = doc?.showSection !== false

    // No selection document at all → fall back to local content.
    if (!doc || !Array.isArray(doc.services)) return { items: null, showSection }

    const valid = doc.services
      .map(mapPopular)
      .filter((s): s is ResolvedService => s !== null)

    // Selection exists but is insufficient → hide the section.
    if (valid.length < 3) return { items: [], showSection }

    return { items: valid.slice(0, 6), showSection }
  } catch {
    return { items: null, showSection: true }
  }
}
