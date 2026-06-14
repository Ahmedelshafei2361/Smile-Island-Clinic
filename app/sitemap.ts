import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/seo'
import { getServiceSlugs } from '@/sanity/lib/getServices'

/**
 * Sitemap for the bilingual site. Includes the root, both locale homepages, and
 * every active service page in EN + AR. Service slugs come from Sanity (active
 * only) with a local fallback — getServiceSlugs never throws, so the sitemap
 * builds even when Sanity is unavailable. /studio is intentionally excluded.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getServiceSlugs()
  const now = new Date()

  const entries: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${SITE_URL}/en`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { en: `${SITE_URL}/en`, ar: `${SITE_URL}/ar` } },
    },
    {
      url: `${SITE_URL}/ar`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: { languages: { en: `${SITE_URL}/en`, ar: `${SITE_URL}/ar` } },
    },
  ]

  for (const slug of slugs) {
    const en = `${SITE_URL}/en/services/${slug}`
    const ar = `${SITE_URL}/ar/services/${slug}`
    entries.push(
      {
        url: en,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: { languages: { en, ar } },
      },
      {
        url: ar,
        lastModified: now,
        changeFrequency: 'monthly',
        priority: 0.8,
        alternates: { languages: { en, ar } },
      },
    )
  }

  return entries
}
