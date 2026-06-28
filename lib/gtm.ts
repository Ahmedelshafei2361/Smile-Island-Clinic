/**
 * Lightweight Google Tag Manager dataLayer helper.
 *
 * This file contains NO analytics SDK. GTM (loaded consent-gated in
 * components/ui/GoogleTagManager.tsx) is the only consumer/sender, so these
 * pushes are inert until the visitor accepts cookies and GTM loads — nothing
 * leaves the browser before consent.
 *
 * GA4 / Meta Pixel / Microsoft Clarity / Google Ads must be added INSIDE GTM
 * using these events as triggers — never imported into the code.
 */
export type DataLayerParams = Record<string, string | number | boolean | undefined>

export function pushToDataLayer(event: string, params: DataLayerParams = {}): void {
  if (typeof window === 'undefined') return
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  const payload: Record<string, unknown> = { event }
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== '') payload[k] = v
  }
  w.dataLayer.push(payload)
}
