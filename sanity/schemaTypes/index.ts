import type { SchemaTypeDefinition } from 'sanity'

import { homePage } from './homePage'
import { beforeAfterSection } from './beforeAfterSection'
import { service } from './service'
import { popularTreatments } from './popularTreatments'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, beforeAfterSection, service, popularTreatments],
}
