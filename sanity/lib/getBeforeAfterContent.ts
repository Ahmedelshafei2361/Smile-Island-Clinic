import { client } from './client'
import { urlForImage } from './image'
import { isSanityConfigured } from '../env'

/**
 * Resolved Before & After content for the homepage. Contains only an ordered
 * list of image URLs. Both /en and /ar share the same images.
 */
export interface BeforeAfterContent {
  images: string[]
}

const BA_QUERY = `*[_type == "beforeAfterSection" && _id == "beforeAfterImages"][0]{
  images
}`

/**
 * Fetch Before & After images. Returns null when Sanity is not configured,
 * the fetch fails, or no images exist — callers fall back to local content.
 */
export async function getBeforeAfterContent(): Promise<BeforeAfterContent | null> {
  if (!isSanityConfigured) return null

  try {
    const doc = await client.fetch(BA_QUERY, {}, { next: { revalidate: 30 } })

    if (!doc || !Array.isArray(doc.images) || doc.images.length === 0) {
      return null
    }

    // Map each Sanity image to a URL, skipping any broken items.
    const images: string[] = []
    for (const img of doc.images) {
      if (!img?.asset) continue
      try {
        images.push(urlForImage(img).width(900).fit('max').url())
      } catch {
        // Skip broken image — keep the rest.
      }
    }

    return images.length > 0 ? { images } : null
  } catch {
    // Network/config error → silent fallback to local content.
    return null
  }
}
