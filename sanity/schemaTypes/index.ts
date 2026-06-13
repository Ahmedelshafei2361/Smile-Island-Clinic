import type { SchemaTypeDefinition } from 'sanity'

import { homePage } from './homePage'
import { beforeAfterSection } from './beforeAfterSection'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [homePage, beforeAfterSection],
}
