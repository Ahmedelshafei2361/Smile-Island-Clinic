import { client } from './client'
import { urlForImage } from './image'
import { isSanityConfigured } from '../env'

/**
 * Resolved Before & After content the section consumes. Every field is
 * optional — the component merges this over its local static defaults, so
 * a missing Sanity field (or no Sanity at all) never blanks the section.
 */
export interface BeforeAfterContent {
  sectionTitle?: string
  sectionAccent?: string
  sectionSubtitle?: string
  cases?: BeforeAfterCmsCase[]
}

export interface BeforeAfterCmsCase {
  /** Sanity-generated `_key` used as React key. */
  id: string
  title?: string
  category?: string
  /** Combined before/after image URL (homepage gallery). */
  image?: string
  /** Separate before image URL (comparison slider). */
  beforeImage?: string
  /** Separate after image URL (comparison slider). */
  afterImage?: string
  altText?: string
  serviceSlug?: string
  order: number
  isActive: boolean
}

const BA_QUERY = `*[_type == "beforeAfterSection" && locale == $locale][0]{
  sectionTitle,
  sectionAccent,
  sectionSubtitle,
  cases[]{
    _key,
    title,
    category,
    image,
    beforeImage,
    afterImage,
    altText,
    serviceSlug,
    order,
    isActive
  }
}`

/**
 * Fetch Before & After content for a locale. Returns null when Sanity is not
 * configured, the fetch fails, or no document exists — callers fall back to
 * local content.
 */
export async function getBeforeAfterContent(
  locale: string,
): Promise<BeforeAfterContent | null> {
  if (!isSanityConfigured) return null

  try {
    const doc = await client.fetch(
      BA_QUERY,
      { locale: locale === 'ar' ? 'ar' : 'en' },
      { next: { revalidate: 60 } },
    )
    if (!doc) return null

    const content: BeforeAfterContent = {}

    if (doc.sectionTitle) content.sectionTitle = doc.sectionTitle
    if (doc.sectionAccent) content.sectionAccent = doc.sectionAccent
    if (doc.sectionSubtitle) content.sectionSubtitle = doc.sectionSubtitle

    if (Array.isArray(doc.cases) && doc.cases.length > 0) {
      content.cases = doc.cases
        .filter(
          (c: { isActive?: boolean }) => c.isActive !== false,
        )
        .sort(
          (a: { order?: number }, b: { order?: number }) =>
            (a.order ?? 0) - (b.order ?? 0),
        )
        .map(
          (c: {
            _key: string
            title?: string
            category?: string
            image?: { asset?: unknown }
            beforeImage?: { asset?: unknown }
            afterImage?: { asset?: unknown }
            altText?: string
            serviceSlug?: string
            order?: number
            isActive?: boolean
          }): BeforeAfterCmsCase => ({
            id: c._key,
            title: c.title,
            category: c.category,
            image: c.image?.asset
              ? urlForImage(c.image).width(900).fit('max').url()
              : undefined,
            beforeImage: c.beforeImage?.asset
              ? urlForImage(c.beforeImage).width(900).fit('max').url()
              : undefined,
            afterImage: c.afterImage?.asset
              ? urlForImage(c.afterImage).width(900).fit('max').url()
              : undefined,
            altText: c.altText,
            serviceSlug: c.serviceSlug,
            order: c.order ?? 0,
            isActive: c.isActive !== false,
          }),
        )
    }

    return content
  } catch {
    // Network/config error → silent fallback to local content.
    return null
  }
}
