'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { pushToDataLayer } from '@/lib/gtm'
import { toLocale } from '@/lib/locale'

/**
 * No-code tracking layer for GTM.
 *
 * - Pushes a `page_view` (with page_path + locale) on first load and on every
 *   App Router client-side navigation — so /en, /ar and all service pages are
 *   trackable in GTM via a "Custom Event = page_view" trigger.
 * - One delegated click listener classifies key conversions from existing hrefs
 *   (no per-component code, no UI changes) and pushes structured events. An
 *   explicit `data-track` attribute, if present, always takes precedence so the
 *   client can enrich/override later without code from us.
 *
 * Nothing here sends data anywhere. GTM (consent-gated) is the only sender, so
 * these pushes do nothing until the visitor accepts cookies and GTM loads.
 */
function serviceSlugFrom(path: string): string {
  const m = path.match(/\/(?:en|ar)\/services\/([^/?#]+)/)
  return m ? m[1] : ''
}

function socialPlatform(href: string): string {
  const h = href.toLowerCase()
  if (h.includes('facebook')) return 'facebook'
  if (h.includes('instagram')) return 'instagram'
  if (h.includes('tiktok')) return 'tiktok'
  if (h.includes('youtu')) return 'youtube'
  if (h.includes('linkedin')) return 'linkedin'
  if (h.includes('x.com') || h.includes('twitter')) return 'x'
  return 'other'
}

export default function AnalyticsTracker({ locale }: { locale: string }) {
  const pathname = usePathname()
  const loc = toLocale(locale)

  // Page views (initial + every route change).
  useEffect(() => {
    pushToDataLayer('page_view', { page_path: pathname, locale: loc })
  }, [pathname, loc])

  // Delegated click tracking for key conversions.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null
      const el = target?.closest('a, button') as HTMLElement | null
      if (!el) return

      const anchor = el.closest('a') as HTMLAnchorElement | null
      const href = anchor?.getAttribute('href') || ''

      // cta_location derived from the nearest section[id], or header/footer.
      const sectionId = el.closest('section[id]')?.id
      const cta_location =
        sectionId || (el.closest('header') ? 'header' : el.closest('footer') ? 'footer' : undefined)

      const base = {
        locale: loc,
        page_path: pathname,
        link_url: href || undefined,
        cta_location,
      }

      // 1) Explicit data-track wins (client can add these any time).
      const tracked = el.closest('[data-track]') as HTMLElement | null
      if (tracked?.dataset.track) {
        const { track, ...rest } = tracked.dataset
        pushToDataLayer(track, { ...base, ...rest })
        return
      }

      if (!anchor || !href) return

      // 2) Classify by href.
      const pageSlug = serviceSlugFrom(pathname)

      if (/wa\.me|api\.whatsapp\.com|web\.whatsapp\.com/i.test(href)) {
        pushToDataLayer(pageSlug ? 'service_booking_click' : 'booking_click', {
          ...base,
          service_slug: pageSlug || undefined,
        })
      } else if (/^tel:/i.test(href)) {
        pushToDataLayer('phone_click', base)
      } else if (/google\.[a-z.]+\/maps|goo\.gl\/maps|maps\.app\.goo\.gl/i.test(href)) {
        pushToDataLayer('map_click', base)
      } else if (
        /(facebook|instagram|tiktok|youtube|youtu\.be|linkedin|twitter|x\.com)\./i.test(href)
      ) {
        pushToDataLayer('social_click', { ...base, social_platform: socialPlatform(href) })
      } else if (anchor.hasAttribute('lang')) {
        // The locale switcher is the only link carrying a `lang` attribute.
        pushToDataLayer('language_switch', { ...base, to_locale: anchor.getAttribute('lang') || undefined })
      } else {
        const linkSlug = serviceSlugFrom(href)
        if (linkSlug) {
          pushToDataLayer('service_click', { ...base, service_slug: linkSlug })
        }
      }
    }

    document.addEventListener('click', onClick, true)
    return () => document.removeEventListener('click', onClick, true)
  }, [pathname, loc])

  return null
}
