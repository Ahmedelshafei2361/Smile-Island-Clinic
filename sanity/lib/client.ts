import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

// `projectId` falls back to a syntactically-valid placeholder so createClient
// never throws at module load. Actual fetches are guarded by isSanityConfigured.
export const client = createClient({
  projectId: projectId || 'placeholder',
  dataset,
  apiVersion,
  useCdn: true,
})
