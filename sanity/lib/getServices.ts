import { client } from './client'
import { urlForImage } from './image'
import { isSanityConfigured } from '../env'
import { services as localServices } from '@/lib/data'
import type { Service } from '@/lib/data'

/** One before/after slider case, resolved to plain image URLs. */
export interface ResolvedSliderCase {
  beforeImage: string
  afterImage: string
}

/**
 * A service resolved from Sanity (or local fallback) into a flat, render-ready
 * shape. Field names match the local `Service` type where they overlap, so the
 * existing section/page components consume it without churn.
 */
export interface ResolvedService {
  slug: string
  titleEn: string
  titleAr: string
  shortDescriptionEn: string
  shortDescriptionAr: string
  stepsEn: string[]
  stepsAr: string[]
  /** Single source image, already converted to a URL. */
  image: string
  /** 0–3 before/after cases for the service page slider. */
  sliderCases: ResolvedSliderCase[]
  order: number
}

// Shared GROQ projection — keeps every query returning the same raw shape.
const SERVICE_PROJECTION = `{
  "slug": slug.current,
  nameEn,
  nameAr,
  shortDescriptionEn,
  shortDescriptionAr,
  steps[]{ stepEn, stepAr },
  image,
  sliderCases[]{ beforeImage, afterImage },
  displayOrder,
  active
}`

interface RawImage {
  asset?: { _ref?: string }
}

interface RawService {
  slug?: string
  nameEn?: string
  nameAr?: string
  shortDescriptionEn?: string
  shortDescriptionAr?: string
  steps?: { stepEn?: string; stepAr?: string }[]
  image?: RawImage
  sliderCases?: { beforeImage?: RawImage; afterImage?: RawImage }[]
  displayOrder?: number
  active?: boolean
}

/**
 * Map a raw Sanity service into ResolvedService. Returns null when any field
 * required to render safely is missing — incomplete services are excluded from
 * lists and 404 on their page rather than breaking rendering.
 */
function mapService(raw: RawService | null | undefined): ResolvedService | null {
  if (!raw) return null
  if (!raw.slug || !raw.nameEn || !raw.nameAr) return null
  if (!raw.shortDescriptionEn || !raw.shortDescriptionAr) return null
  if (!raw.image?.asset) return null

  const stepsEn = (raw.steps ?? [])
    .map((s) => s?.stepEn)
    .filter((s): s is string => Boolean(s))
  const stepsAr = (raw.steps ?? [])
    .map((s) => s?.stepAr)
    .filter((s): s is string => Boolean(s))
  if (stepsEn.length < 2 || stepsAr.length < 2) return null

  let image: string
  try {
    image = urlForImage(raw.image).width(1600).fit('max').url()
  } catch {
    return null
  }

  const sliderCases: ResolvedSliderCase[] = []
  for (const c of raw.sliderCases ?? []) {
    if (!c?.beforeImage?.asset || !c?.afterImage?.asset) continue
    try {
      sliderCases.push({
        beforeImage: urlForImage(c.beforeImage).width(900).fit('max').url(),
        afterImage: urlForImage(c.afterImage).width(900).fit('max').url(),
      })
    } catch {
      // Skip a broken case — keep the rest.
    }
  }

  return {
    slug: raw.slug,
    titleEn: raw.nameEn,
    titleAr: raw.nameAr,
    shortDescriptionEn: raw.shortDescriptionEn,
    shortDescriptionAr: raw.shortDescriptionAr,
    stepsEn,
    stepsAr,
    image,
    sliderCases: sliderCases.slice(0, 3),
    order: raw.displayOrder ?? 999,
  }
}

/** Map a local static Service into the resolved shape (no slider cases). */
function fromLocal(s: Service): ResolvedService {
  return {
    slug: s.slug,
    titleEn: s.titleEn,
    titleAr: s.titleAr,
    shortDescriptionEn: s.shortDescriptionEn,
    shortDescriptionAr: s.shortDescriptionAr,
    stepsEn: s.stepsEn,
    stepsAr: s.stepsAr,
    image: s.thumbnailImage,
    sliderCases: [],
    order: s.order,
  }
}

const localResolved = (): ResolvedService[] =>
  [...localServices].sort((a, b) => a.order - b.order).map(fromLocal)

/**
 * All active services, sorted by display order. Falls back to local static
 * data when Sanity is not configured, the fetch fails, or returns nothing.
 */
export async function getServices(): Promise<ResolvedService[]> {
  if (!isSanityConfigured) return localResolved()

  try {
    const docs = await client.fetch<RawService[]>(
      `*[_type == "service" && active == true] | order(displayOrder asc) ${SERVICE_PROJECTION}`,
      {},
      { next: { revalidate: 30 } },
    )

    const mapped = (docs ?? [])
      .map(mapService)
      .filter((s): s is ResolvedService => s !== null)

    return mapped.length > 0 ? mapped : localResolved()
  } catch {
    return localResolved()
  }
}

/** Local static service for a slug, mapped to the resolved shape (or null). */
function localBySlug(slug: string): ResolvedService | null {
  const local = localServices.find((s) => s.slug === slug)
  return local ? fromLocal(local) : null
}

/**
 * A single service by slug. Resolution order:
 *   - Sanity not configured → local fallback (migration / no-Sanity safety).
 *   - Sanity doc exists & active === false → null (page 404s; never resurrected
 *     from local).
 *   - Sanity doc exists & active & complete → render it.
 *   - Sanity doc exists & active & incomplete → local fallback (avoid broken UI).
 *   - No Sanity doc for this slug → local fallback (migration safety).
 *   - Fetch error → local fallback.
 * Unknown slugs with no local match return null → 404.
 */
export async function getServiceBySlug(
  slug: string,
): Promise<ResolvedService | null> {
  if (!isSanityConfigured) return localBySlug(slug)

  try {
    // Query WITHOUT the active filter so we can tell "inactive" apart from
    // "does not exist" — an inactive service must not fall back to local.
    const doc = await client.fetch<RawService | null>(
      `*[_type == "service" && slug.current == $slug][0] ${SERVICE_PROJECTION}`,
      { slug },
      { next: { revalidate: 30 } },
    )

    // No such document in Sanity → local fallback (migration safety).
    if (!doc) return localBySlug(slug)

    // Exists but deliberately hidden → 404, do not resurrect from local.
    if (doc.active === false) return null

    // Active: render if complete, else fall back to local to avoid broken UI.
    return mapService(doc) ?? localBySlug(slug)
  } catch {
    return localBySlug(slug)
  }
}

/**
 * Slugs of all active services for generateStaticParams. Returns local slugs
 * when Sanity is not configured or unavailable. Pages use dynamicParams so new
 * Sanity services still render after deployment without a rebuild.
 */
export async function getServiceSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return localServices.map((s) => s.slug)

  try {
    const slugs = await client.fetch<string[]>(
      `*[_type == "service" && active == true && defined(slug.current)].slug.current`,
      {},
      { next: { revalidate: 30 } },
    )
    return slugs && slugs.length > 0 ? slugs : localServices.map((s) => s.slug)
  } catch {
    return localServices.map((s) => s.slug)
  }
}
