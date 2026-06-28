import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// Server-only read token. NEVER prefix with NEXT_PUBLIC_ — Next.js strips
// non-public env from the browser bundle, so this stays server-side (all CMS
// fetches run in Server Components / ISR). It is OPTIONAL: when absent the
// client behaves exactly as before (anonymous reads + local fallback), so the
// build never depends on it.
//
// Why it's needed: this dataset's anonymous role can read every document type
// EXCEPT `service`, so a tokenless client returns zero services and the site
// falls back to local data for all of them. A read token lets server-side
// fetches see published `service` documents (and resolve Popular Treatments
// references). Alternatively, grant the public role read access to `service`
// in the Sanity dashboard and no token is required.
const readToken = process.env.SANITY_API_READ_TOKEN || ''

// `projectId` falls back to a syntactically-valid placeholder so createClient
// never throws at module load. Actual fetches are guarded by isSanityConfigured.
export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  // The CDN can't serve token-authenticated reads; use it only when anonymous.
  useCdn: !readToken,
  // Never serve draft content on the live site.
  perspective: 'published',
  ...(readToken ? { token: readToken } : {}),
})
