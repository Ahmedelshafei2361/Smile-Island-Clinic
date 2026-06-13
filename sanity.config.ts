'use client'

import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'

import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'

// Singleton document types — only one document of each type should exist.
// `service` is intentionally NOT a singleton (it is a collection).
const SINGLETON_TYPES = new Set([
  'homePage',
  'beforeAfterSection',
  'popularTreatments',
])

export default defineConfig({
  basePath: '/studio',
  projectId: projectId || 'placeholder',
  dataset,
  schema,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home Page Hero')
              .id('homePageHero')
              .child(
                S.document()
                  .schemaType('homePage')
                  .documentId('homePageHero')
                  .title('Home Page Hero'),
              ),
            S.listItem()
              .title('Before & After Images')
              .id('beforeAfterImages')
              .child(
                S.document()
                  .schemaType('beforeAfterSection')
                  .documentId('beforeAfterImages')
                  .title('Before & After Images'),
              ),
            S.divider(),
            S.documentTypeListItem('service').title('Services'),
            S.listItem()
              .title('Popular Treatments')
              .id('popularTreatments')
              .child(
                S.document()
                  .schemaType('popularTreatments')
                  .documentId('popularTreatments')
                  .title('Popular Treatments'),
              ),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  document: {
    // Hide singleton types from the global "Create new document" dialog.
    newDocumentOptions: (prev, { creationContext }) =>
      creationContext.type === 'global'
        ? prev.filter((item) => !SINGLETON_TYPES.has(item.templateId))
        : prev,
    // Prevent deleting or duplicating singleton documents.
    actions: (prev, { schemaType }) =>
      SINGLETON_TYPES.has(schemaType)
        ? prev.filter(
            ({ action }) => action !== 'delete' && action !== 'duplicate',
          )
        : prev,
  },
})
