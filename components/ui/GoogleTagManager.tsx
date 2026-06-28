'use client'

import Script from 'next/script'
import { useEffect, useState } from 'react'
import { CONSENT_EVENT, CONSENT_KEY, hasAcceptedConsent } from '@/lib/consent'

// Inlined at build time. When unset, GTM never loads.
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

/**
 * Google Tag Manager loader — consent-gated.
 *
 * - Loads the GTM container ONLY when `NEXT_PUBLIC_GTM_ID` is set AND the visitor
 *   has accepted non-essential cookies (via the existing consent system).
 * - Reacts to consent changes in the same tab (CONSENT_EVENT) and other tabs
 *   (storage event) so it can start right after the visitor clicks Accept,
 *   without a reload. Rejecting never loads it.
 * - No <noscript> iframe is rendered: it would fire on every page load
 *   regardless of consent, which would violate the consent requirement.
 */
export default function GoogleTagManager() {
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    if (!GTM_ID) return

    if (hasAcceptedConsent()) {
      setEnabled(true)
      return
    }

    const check = () => {
      if (hasAcceptedConsent()) setEnabled(true)
    }

    // Same-tab: fired by setConsent() when the visitor chooses in the banner.
    window.addEventListener(CONSENT_EVENT, check)
    // Cross-tab: localStorage changes propagate via the native storage event.
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) check()
    }
    window.addEventListener('storage', onStorage)

    return () => {
      window.removeEventListener(CONSENT_EVENT, check)
      window.removeEventListener('storage', onStorage)
    }
  }, [])

  if (!GTM_ID || !enabled) return null

  return (
    <Script id="gtm-loader" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  )
}
