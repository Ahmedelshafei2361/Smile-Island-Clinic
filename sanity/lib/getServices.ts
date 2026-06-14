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

/** Resolve a raw Sanity image to a URL, or null if absent/broken. */
function resolveImage(img: RawImage | undefined, width: number): string | null {
  if (!img?.asset) return null
  try {
    return urlForImage(img).width(width).fit('max').url()
  } catch {
    return null
  }
}

/** Resolve a raw service's before/after slider cases to URL pairs. */
function resolveSliderCases(raw: RawService): ResolvedSliderCase[] {
  const cases: ResolvedSliderCase[] = []
  for (const c of raw.sliderCases ?? []) {
    const beforeImage = resolveImage(c?.beforeImage, 900)
    const afterImage = resolveImage(c?.afterImage, 900)
    if (beforeImage && afterImage) cases.push({ beforeImage, afterImage })
  }
  return cases.slice(0, 3)
}

/**
 * Map a raw Sanity service into ResolvedService. Returns null when any field
 * required to render safely is missing — incomplete services with no local
 * counterpart are excluded from lists and 404 on their page rather than
 * breaking rendering.
 */
function mapService(raw: RawService | null | undefined): ResolvedService | null {
  if (!raw) return null
  if (!raw.slug || !raw.nameEn || !raw.nameAr) return null
  if (!raw.shortDescriptionEn || !raw.shortDescriptionAr) return null

  const image = resolveImage(raw.image, 1600)
  if (!image) return null

  const stepsEn = (raw.steps ?? [])
    .map((s) => s?.stepEn)
    .filter((s): s is string => Boolean(s))
  const stepsAr = (raw.steps ?? [])
    .map((s) => s?.stepAr)
    .filter((s): s is string => Boolean(s))
  if (stepsEn.length < 2 || stepsAr.length < 2) return null

  return {
    slug: raw.slug,
    titleEn: raw.nameEn,
    titleAr: raw.nameAr,
    shortDescriptionEn: raw.shortDescriptionEn,
    shortDescriptionAr: raw.shortDescriptionAr,
    stepsEn,
    stepsAr,
    image,
    sliderCases: resolveSliderCases(raw),
    order: raw.displayOrder ?? 999,
  }
}

/**
 * Merge a CMS service over its local hardcoded counterpart, field by field.
 * Each CMS field is used only when present/valid; otherwise the local value is
 * kept. This lets a partially-filled CMS document (e.g. seeded text with no
 * uploaded image yet) render using local images/steps until completed.
 * Returns null only when an essential field is missing from BOTH sources.
 */
function mergeService(
  local: ResolvedService | null,
  raw: RawService,
): ResolvedService | null {
  const titleEn = raw.nameEn || local?.titleEn
  const titleAr = raw.nameAr || local?.titleAr
  const shortDescriptionEn = raw.shortDescriptionEn || local?.shortDescriptionEn
  const shortDescriptionAr = raw.shortDescriptionAr || local?.shortDescriptionAr

  const image = resolveImage(raw.image, 1600) ?? local?.image

  const cmsStepsEn = (raw.steps ?? [])
    .map((s) => s?.stepEn)
    .filter((s): s is string => Boolean(s))
  const cmsStepsAr = (raw.steps ?? [])
    .map((s) => s?.stepAr)
    .filter((s): s is string => Boolean(s))
  const useCmsSteps = cmsStepsEn.length > 0 && cmsStepsAr.length > 0
  const stepsEn = useCmsSteps ? cmsStepsEn : local?.stepsEn ?? []
  const stepsAr = useCmsSteps ? cmsStepsAr : local?.stepsAr ?? []

  // Slider cases come from CMS only (local data has none).
  const sliderCases = resolveSliderCases(raw)

  if (!titleEn || !titleAr || !shortDescriptionEn || !shortDescriptionAr) return null
  if (!image) return null

  return {
    slug: raw.slug || local?.slug || '',
    titleEn,
    titleAr,
    shortDescriptionEn,
    shortDescriptionAr,
    stepsEn,
    stepsAr,
    image,
    sliderCases,
    order: raw.displayOrder ?? local?.order ?? 999,
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
 * All services for the website, sorted by display order. CMS data is merged
 * over local data per field, so local services never disappear because their
 * CMS document is incomplete (e.g. no image uploaded yet). A local service
 * whose CMS document is explicitly inactive is hidden. CMS-only services
 * (added in Studio, not in local data) are appended when complete.
 *
 * Falls back to local static data when Sanity is not configured or the fetch
 * fails.
 */
export async function getServices(): Promise<ResolvedService[]> {
  if (!isSanityConfigured) return localResolved()

  try {
    // No active filter here — we need to detect "inactive" to hide a service.
    const docs = await client.fetch<RawService[]>(
      `*[_type == "service"] ${SERVICE_PROJECTION}`,
      {},
      { next: { revalidate: 30 } },
    )

    const bySlug = new Map<string, RawService>()
    for (const d of docs ?? []) if (d?.slug) bySlug.set(d.slug, d)

    const result: ResolvedService[] = []
    const usedSlugs = new Set<string>()

    // Every local service, merged with its CMS document when present.
    for (const local of localServices) {
      const resolvedLocal = fromLocal(local)
      const doc = bySlug.get(local.slug)
      usedSlugs.add(local.slug)
      if (!doc) {
        result.push(resolvedLocal)
        continue
      }
      if (doc.active === false) continue // hidden in CMS
      result.push(mergeService(resolvedLocal, doc) ?? resolvedLocal)
    }

    // CMS-only services not present in local data (added in Studio).
    for (const doc of docs ?? []) {
      if (!doc?.slug || usedSlugs.has(doc.slug)) continue
      if (doc.active === false) continue
      const mapped = mapService(doc)
      if (mapped) result.push(mapped)
    }

    result.sort((a, b) => a.order - b.order)
    return result.length > 0 ? result : localResolved()
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
 *   - Sanity doc exists & active → CMS merged over local per field (CMS wins
 *     where present; local fills the gaps, e.g. an un-uploaded image).
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

    const local = localBySlug(slug)

    // No such document in Sanity → local fallback (migration safety).
    if (!doc) return local

    // Exists but deliberately hidden → 404, do not resurrect from local.
    if (doc.active === false) return null

    // Active: merge CMS over local; if still incomplete, use local as-is.
    return mergeService(local, doc) ?? local
  } catch {
    return localBySlug(slug)
  }
}

/**
 * Slugs to pre-render via generateStaticParams. Always includes every local
 * (hardcoded) slug so all known service pages build, plus any active CMS slugs.
 * Pages use dynamicParams so new Sanity services still render after deployment
 * without a rebuild.
 */
export async function getServiceSlugs(): Promise<string[]> {
  const localSlugs = localServices.map((s) => s.slug)
  if (!isSanityConfigured) return localSlugs

  try {
    const cmsSlugs = await client.fetch<string[]>(
      `*[_type == "service" && active == true && defined(slug.current)].slug.current`,
      {},
      { next: { revalidate: 30 } },
    )
    return Array.from(new Set([...localSlugs, ...(cmsSlugs ?? [])]))
  } catch {
    return localSlugs
  }
}
