/**
 * Cookie-consent state helper. Single source of truth for whether the visitor
 * has accepted or rejected non-essential (analytics / marketing) cookies.
 *
 * Stored in localStorage under `cookie-consent` as `accepted` | `rejected`.
 * No value yet → no decision made (banner should show).
 *
 * Future analytics (Microsoft Clarity, Meta Pixel) must call `hasAcceptedConsent()`
 * before loading, and may subscribe to `CONSENT_EVENT` to react when the visitor
 * changes their choice without a page reload. Nothing here loads any script.
 */

export const CONSENT_KEY = 'cookie-consent'
export const CONSENT_EVENT = 'cookie-consent-change'

export type ConsentValue = 'accepted' | 'rejected'

/** The visitor's stored choice, or null if they haven't decided yet. */
export function getConsent(): ConsentValue | null {
  if (typeof window === 'undefined') return null
  try {
    const v = window.localStorage.getItem(CONSENT_KEY)
    return v === 'accepted' || v === 'rejected' ? v : null
  } catch {
    return null
  }
}

/** True once the visitor has either accepted or rejected. */
export function hasConsentDecision(): boolean {
  return getConsent() !== null
}

/** True only when the visitor has explicitly accepted non-essential cookies. */
export function hasAcceptedConsent(): boolean {
  return getConsent() === 'accepted'
}

/** Persist the choice and notify listeners (same-tab) via a CustomEvent. */
export function setConsent(value: ConsentValue): void {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(CONSENT_KEY, value)
  } catch {
    // Storage unavailable (private mode quota, etc.) — fail silently.
  }
  window.dispatchEvent(new CustomEvent<ConsentValue>(CONSENT_EVENT, { detail: value }))
}
